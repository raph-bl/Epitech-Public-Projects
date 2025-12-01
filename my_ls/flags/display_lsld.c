/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** display_lsld.c
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

int display(struct stat *sb, char *path)
{
    my_put_unsigned_int(sb->st_size);
    my_putchar(' ');
    my_putdate(ctime(&sb->st_mtime) + 4);
    my_putstr(path);
    my_putchar('\n');
    return 0;
}

int print_lsld(char *path)
{
    struct dirent *entry;
    struct stat sb;
    DIR *dir = opendir(path);

    if (!dir)
        return my_perror(path);
    stat(path, &sb);
    entry = readdir(dir);
    parse_perms(&sb);
    my_put_nbr(sb.st_nlink);
    my_putchar(' ');
    my_putstr(getpwuid(sb.st_uid)->pw_name);
    my_putchar(' ');
    my_putstr(getgrgid(sb.st_gid)->gr_name);
    my_putchar(' ');
    display(&sb, path);
    closedir(dir);
    return 0;
}

int display_dl_flag(int argc, char **argv)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        print_lsld("./");
    else
        print_lsld(str);
    return 0;
}
