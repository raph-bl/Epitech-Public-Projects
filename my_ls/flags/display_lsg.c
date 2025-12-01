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
    my_putstr(getgrgid(sb->st_gid)->gr_name);
    my_putchar(' ');
    my_put_unsigned_int(sb->st_size);
    my_putchar(' ');
    my_putdate(ctime(&sb->st_mtime) + 4);
    my_putstr(entry->d_name);
    my_putchar('\n');
}

static int list_dir_info(char *path)
{
    struct dirent *entry;
    struct stat sb;
    char fullpath[1024];
    DIR *dir = opendir(path);

    if (!dir)
        return my_perror(path);
    display_total_block_usage(path, false);
    for (entry = readdir(dir); entry != NULL; entry = readdir(dir)) {
        if (entry->d_name[0] == '.')
            continue;
        copy_and_concat(fullpath, path, entry->d_name);
        if (lstat(fullpath, &sb) == -1)
            continue;
        display_dir_info(entry, &sb);
    }
    closedir(dir);
    return 0;
}

int displag_lsg(int argc, char **argv)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        list_dir_info("./");
    else
        list_dir_info(str);
    return 0;
}
