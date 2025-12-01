/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** concat_params.c
*/

#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <libgen.h>
#include <dirent.h>
#include <stdbool.h>
#include "my.h"

int main(int argc, char **argv)
{
    if (argc == 1) {
        print_dir(opendir("./"), false);
        return 0;
    }
    parser(argc, argv);
    return 0;
}
