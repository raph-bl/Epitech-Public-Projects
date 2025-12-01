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

void swap_bis(char **a, char **b)
{
    char *temp = *a;

    *a = *b;
    *b = temp;
}

void compare_and_swap(char **files, int j, struct stat *st1, struct stat *st2)
{
    if (st1->st_mtime < st2->st_mtime)
        swap_bis(&files[j], &files[j + 1]);
}

void sort_by_time(char **files, int count)
{
    struct stat st1;
    struct stat st2;

    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - i - 1; j++) {
            stat(files[j], &st1);
            stat(files[j + 1], &st2);
            compare_and_swap(files, j, &st1, &st2);
        }
    }
}

int print_lst(char *path)
{
    DIR *dir = opendir(path);
    struct dirent *entry;
    char *files[1024];
    int count = 0;

    if (!dir)
        return my_perror(path);
    for (entry = readdir(dir); entry != NULL; entry = readdir(dir))
        if (entry->d_name[0] != '.') {
            files[count] = my_strdup(entry->d_name);
            count++;
        }
    sort_by_time(files, count);
    for (int i = 0; i < count; i++) {
        my_putstr(files[i]);
        my_putchar(' ');
        free(files[i]);
    }
    closedir(dir);
    return 0;
}

int display_t_flag(int argc, char **argv, bool show_hidden)
{
    char *str = parse_path(argc, argv);

    if (str == NULL)
        print_lst("./");
    else
        print_lst(str);
    return 0;
}
