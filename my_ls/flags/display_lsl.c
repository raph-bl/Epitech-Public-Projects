/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** parser.c
*/
#include <sys/types.h>
#include <sys/stat.h>
#include <dirent.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <libgen.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>
#include <grp.h>
#include <pwd.h>
#include "my.h"

char *copy_and_concat(char *dest, char *src1, char *src2)
{
    my_strcpy(dest, src1);
    my_strcat(dest, "/");
    my_strcat(dest, src2);
    return dest;
}

void display_total_block_usage(char *path, bool show_hidden)
{
    struct dirent *entry;
    struct stat sb;
    DIR *dir = opendir(path);
    char fullpath[1024];
    int total_blocks = 0;

    for (entry = readdir(dir); entry != NULL; entry = readdir(dir)) {
        if (!show_hidden && entry->d_name[0] == '.')
            continue;
        copy_and_concat(fullpath, path, entry->d_name);
        if (stat(fullpath, &sb) == -1)
            continue;
        total_blocks += sb.st_blocks;
    }
    closedir(dir);
    my_putstr("total ");
    my_put_nbr(total_blocks / 2);
    my_putchar('\n');
}

static void my_putdate(const char *date_str)
{
    for (int i = 0; i < 12; i++) {
        my_putchar(date_str[i]);
    }
    my_putchar(' ');
}

static void display_dir_info(struct dirent *entry, struct stat *sb)
{
    parse_perms(sb);
    my_put_nbr(sb->st_nlink);
    my_putchar(' ');
    my_putstr(getpwuid(sb->st_uid)->pw_name);
    my_putchar(' ');
    my_putstr(getgrgid(sb->st_gid)->gr_name);
    my_putchar(' ');
    my_put_unsigned_int(sb->st_size);
    my_putchar(' ');
    my_putdate(ctime(&sb->st_mtime) + 4);
    my_putstr(entry->d_name);
    my_putchar('\n');
}

static void handle_entry(struct dirent *entry, char *path, struct stat *sb,
    bool show_hidden)
{
    char fullpath[1024];

    if (!show_hidden && entry->d_name[0] == '.')
        return;
    copy_and_concat(fullpath, path, entry->d_name);
    if (lstat(fullpath, sb) == -1)
        return;
    display_dir_info(entry, sb);
}

int list_dir_info_lsl(char *path, bool show_hidden)
{
    struct dirent *entry;
    struct stat sb;
    DIR *dir = opendir(path);

    if (!dir)
        return my_perror(path);
    display_total_block_usage(path, show_hidden);
    for (entry = readdir(dir); entry != NULL; entry = readdir(dir)) {
        handle_entry(entry, path, &sb, show_hidden);
    }
    closedir(dir);
    return 0;
}

int display_lsl(int argc, char **argv, bool show_hidden)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        list_dir_info_lsl("./", show_hidden);
    else
        list_dir_info_lsl(str, show_hidden);
    return 0;
}
