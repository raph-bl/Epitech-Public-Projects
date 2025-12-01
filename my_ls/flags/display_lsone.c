/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** parser.c
*/
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <libgen.h>
#include <dirent.h>
#include <stdbool.h>
#include "my.h"

int print_lsone(char *path)
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
        my_putstr(entry->d_name);
        my_putchar('\n');
    }
    closedir(dir);
    return 0;
}

int display_lsone(int argc, char **argv)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        print_lsone("./");
    else
        print_lsone(str);
    return 0;
}
