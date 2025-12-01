/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strcat.c
*/

#include "../my.h"

char *my_strcat(char *dest, char const *src)
{
    int len_src = my_strlen(src);
    int len_dest = my_strlen(dest);
    int len = len_src + len_dest;

    for (int i = len_dest; i < len; i++) {
        dest[i] = src[i - len_dest];
    }
    dest[len] = '\0';
    return dest;
}
