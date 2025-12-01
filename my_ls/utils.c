/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** utils.c
*/

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "my.h"

int print_dir(DIR *dir, bool show_hidden)
{
    struct dirent *dirent;

    if (dir == NULL)
        return my_perror("ls");
    dirent = readdir(dir);
    if (dirent == NULL)
        return my_perror("ls");
    while (dirent != NULL) {
        if (show_hidden == true || dirent->d_name[0] != '.') {
            my_putstr(dirent->d_name);
            my_putchar(' ');
        }
        dirent = readdir(dir);
    }
    return 0;
}

void parse_perms(struct stat *sb)
{
    my_putstr(S_ISDIR(sb->st_mode) ? "d" : "-");
    my_putstr(sb->st_mode & S_IRUSR ? "r" : "-");
    my_putstr(sb->st_mode & S_IWUSR ? "w" : "-");
    my_putstr(sb->st_mode & S_IXUSR ? "x" : "-");
    my_putstr(sb->st_mode & S_IRGRP ? "r" : "-");
    my_putstr(sb->st_mode & S_IWGRP ? "w" : "-");
    if ((sb->st_mode & S_ISGID) && !(sb->st_mode & S_IXGRP))
        my_putstr("S");
    else if ((sb->st_mode & S_ISGID) && (sb->st_mode & S_IXGRP))
        my_putstr("s");
    else
        my_putstr((sb->st_mode & S_IXGRP) ? ("x") : ("-"));
    my_putstr(sb->st_mode & S_IROTH ? "r" : "-");
    my_putstr(sb->st_mode & S_IWOTH ? "w" : "-");
    if ((sb->st_mode & __S_ISVTX) && !(sb->st_mode & S_IXOTH))
        my_putstr("T ");
    else if ((sb->st_mode & __S_ISVTX) && (sb->st_mode & S_IXOTH))
        my_putstr("t ");
    else
        my_putstr((sb->st_mode & S_IXOTH) ? ("x ") : ("- "));
}

int end_of_str(char *end)
{
    if (end != NULL)
        *end = '\0';
    return 0;
}

int end_of_str_bis(char *end)
{
    if (end != NULL)
        *end = ' ';
    return 0;
}

int my_conditionnal_forest_meudon(char *str,
    int argc, char **argv)
{
    if (find_char(str, 't')) {
        display_t_flag(argc, argv, false);
        return 0;
    }
    if (find_char(str, 'd')) {
        display_d_flag(argc, argv);
        return 0;
    }
    if (find_char(str, 'i')) {
        display_i_flag(argc, argv);
        return 0;
    }
    if (find_char(str, 's')) {
        display_s_flag(argc, argv);
        return 0;
    }
    return 0;
}
