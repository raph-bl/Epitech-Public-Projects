/*
** EPITECH PROJECT, 2024
** my_put_long_long_int_base.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

int my_put_long_long_int_base(long long int nbr, char const *base)
{
    int len = my_strlen(base);
    int sum = 0;

    if (nbr < 0) {
        my_putchar('-');
        sum++;
        nbr = nbr * -1;
    }
    if (nbr >= len) {
        sum += my_put_long_long_int_base(nbr / len, base) + 1;
        my_putchar(base[nbr % len]);
    } else {
        my_putchar(base[nbr]);
        sum++;
    }
    return sum;
}
