/*
** EPITECH PROJECT, 2024
** my_put_int_base.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

int my_put_int_base(int nbr, char const *base)
{
    int base_len = my_strlen(base);
    int sum = 0;

    if (base_len < 2)
        return 0;
    if (nbr < 0) {
        my_putchar('-');
        nbr = -nbr;
        sum++;
    }
    if (nbr >= base_len) {
        sum += my_put_int_base(nbr / base_len, base);
    }
    my_putchar(base[nbr % base_len]);
    sum++;
    return sum;
}
