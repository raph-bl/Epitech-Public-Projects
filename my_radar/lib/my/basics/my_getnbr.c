/*
** EPITECH PROJECT, 2024
** my_getnbr.c
** File description:
** Returns a string formatted number in integer
*/

#include "../my.h"

int check_sign(char const *str, int *i)
{
    int sign = 1;

    if (str[*i] == '-') {
        sign = -1;
        (*i)++;
    } else if (str[*i] == '+') {
        (*i)++;
    }
    return sign;
}

int my_getnbr(char const *str)
{
    int length = my_strlen(str);
    int sum = 0;
    int sign = 1;
    int i = 0;

    if (length > 10) {
        return 0;
    }
    sign = check_sign(str, &i);
    for (; i < length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            sum = sum * 10 + (str[i] - '0');
        } else {
            break;
        }
    }
    return sum * sign;
}
