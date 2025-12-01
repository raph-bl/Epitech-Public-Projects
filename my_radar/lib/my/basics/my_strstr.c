/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strstr.c
*/

#include <stdio.h>

#include "../my.h"

int my_strstr3(char *str, char const *to_find, int len, int i)
{
    for (int x = 0; x != len; x++) {
        if (str[i + x] == to_find[x] && x + 1 == len)
            return 1;
    }
    return 0;
}

int my_strstr2(char *str, char const *to_find, int len, int i)
{
    if (str[i] == to_find[0]) {
        if (my_strstr3(str, to_find, len, i)) {
            return 1;
        }
    }
    return 0;
}

char *my_strstr(char *str, char const *to_find)
{
    int i = 0;
    int len = my_strlen(to_find);

    if (to_find[0] == '\0')
        return str;
    for (; str[i] != '\0'; i++) {
        if (my_strstr2(str, to_find, len, i)) {
            return &str[i];
        }
    }
    return NULL;
}
