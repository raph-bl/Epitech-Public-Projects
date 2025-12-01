/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strcat.c
*/

#include "../my.h"

char *my_strchr(char *source, int c)
{
    for (int i = 0; source[i] != '\0'; i++) {
        if (source[i] == c)
            return (source + i);
    }
    return (NULL);
}
