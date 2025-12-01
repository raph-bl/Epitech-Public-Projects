/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_strcat.c
*/

#include "../my.h"
#include <stdbool.h>

bool is_digit(char c)
{
    return c >= '0' && c <= '9';
}

int my_atoi(const char *str)
{
    int result = 0;
    int sign = 1;
    int i = 0;

    while (str[i] == ' ' || str[i] == '\t' || str[i] == '\n' ||
        str[i] == '\v' || str[i] == '\f' || str[i] == '\r') {
        i++;
    }
    if (str[i] == '-') {
        sign = -1;
        i++;
    } else if (str[i] == '+') {
        i++;
    }
    while (is_digit(str[i])) {
        result = result * 10 + (str[i] - '0');
        i++;
    }
    return sign * result;
}
