/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strcat.c
*/

#include "my_printf.h"

char *my_strcat(char *dest, char const *src)
{
    int len_src = my_strlen(src);
    int len_dest = my_strlen(dest);
    int len = len_src + len_dest;

    for (int i = len_dest; i != len + 1; i++) {
        dest[i] = src[i - len_dest];
    }
    dest[len + 1] = '\0';
    return dest;
}
