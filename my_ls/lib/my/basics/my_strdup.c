/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strdup.c
*/

#include <stdlib.h>
#include "../my.h"

char *my_strdup(char const *src)
{
    char *dest = malloc(sizeof(char *) * (my_strlen(src) + 1));

    my_strcpy(dest, src);
    return dest;
}
