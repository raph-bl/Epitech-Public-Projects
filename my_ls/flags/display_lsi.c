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

static void display_dir_info(struct dirent *entry, struct stat *sb)
{
    my_put_nbr(sb->st_ino);
    my_putchar(' ');
    my_putstr(entry->d_name);
    my_putchar(' ');
}

static int list_dir_info(char *path)
{
    struct dirent *entry;
    struct stat sb;
    char fullpath[1024];
    DIR *dir = opendir(path);

    if (!dir)
        return my_perror(path);
    for (entry = readdir(dir); entry != NULL; entry = readdir(dir)) {
        if (entry->d_name[0] == '.')
            continue;
        copy_and_concat(fullpath, path, entry->d_name);
        if (lstat(fullpath, &sb) == -1)
            continue;
        display_dir_info(entry, &sb);
    }
    my_putchar('\n');
    closedir(dir);
    return 0;
}

int display_i_flag(int argc, char **argv)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        list_dir_info("./");
    else
        list_dir_info(str);
    return 0;
}
