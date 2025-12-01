/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** concat_params.c
*/

#include <stdlib.h>
#include "my_printf.h"

char *concat_params(int argc, char **argv)
{
    int size = 0;
    char *str;

    for (int i = 0; i < argc; i++)
        size += my_strlen(argv[i]) + 1;
    str = malloc(sizeof(char) * size);
    for (int i = 0; i < size + 1; i++)
        str[i] = 0;
    for (int i = 0; i < argc; i++) {
        my_strcat(str, argv[i]);
        if (i != argc - 1)
            my_strcat(str, "\n");
    }
    return str;
}
