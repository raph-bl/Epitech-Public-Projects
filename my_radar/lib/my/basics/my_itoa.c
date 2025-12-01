/*
** EPITECH PROJECT, 2024
** my_itoa
** File description:
** converts integer to string
*/

#include "../my.h"

int my_itoa(int nb, char *str)
{
    int i = 0;

    if (nb == 0) {
        str[i] = '0';
        i++;
        str[i] = '\0';
        return i;
    }
    while (nb > 0) {
        str[i] = (nb % 10) + '0';
        i++;
        nb /= 10;
    }
    my_reverse_str_goat(str, i);
    return i;
}
