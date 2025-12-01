/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strncat.c
*/

#include "../my.h"

char *my_strncat(char *dest, char const *src, int nb)
{
    int len_src = my_strlen(src);
    int len_dest = my_strlen(dest);
    int len = len_src + len_dest;

    if (nb < 0)
        return dest;
    for (int i = 0; i != len_dest + len + 1 && i != nb; i++) {
        dest[len_dest + i] = src[i];
    }
    dest[len + 1] = '\0';
    return dest;
}
