/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_revstr.c
*/

#include "../my.h"

char *my_revstr(char *str)
{
    int len = my_strlen(str);
    char temp[len];

    my_strcpy(temp, str);
    for (int i = 0; temp[i] != '\0'; i++) {
        str[i] = temp[len - i - 1];
    }
    return str;
}
