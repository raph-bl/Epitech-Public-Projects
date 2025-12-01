/*
** EPITECH PROJECT, 2024
** my_evil_str.c
** File description:
** Reverse string
*/

#include "my_printf.h"

char *my_evil_str(char *str)
{
    int length = my_strlen(str);
    char str2[length];

    for (int i = 0; i < length; i++) {
        str2[i] = str[i];
    }
    for (int i = 0; i < length; i++) {
        str[i] = str2[length - i - 1];
    }
    return str;
}
