/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** display_lsd.c
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

int print_lsd(char *path)
{
    struct dirent *entry;
    struct stat sb;
    char fullpath[1024];
    DIR *dir = opendir(path);

    if (!dir)
        return my_perror(path);
    my_putstr(path);
    for (entry = readdir(dir); entry != NULL; entry = readdir(dir)) {
        if (entry->d_name[0] == '.')
            continue;
        copy_and_concat(fullpath, path, entry->d_name);
        if (lstat(fullpath, &sb) == -1)
            continue;
    }
    closedir(dir);
    my_putchar('\n');
    return 0;
}

int display_d_flag(int argc, char **argv)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        print_lsd("./");
    else
        print_lsd(str);
    return 0;
}
