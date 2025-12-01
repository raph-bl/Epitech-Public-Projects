/*
** EPITECH PROJECT, 2024
** my_put_int.c
** File description:
** Print number
*/

#include "../my.h"

int my_put_int(int nb)
{
    int o_nb = nb;

    if (nb == -2147483648) {
        my_putchar('-');
        my_put_int(214748364);
        my_putchar('8');
        return 11;
    }
    if (nb < 0) {
        my_putchar('-');
        nb = -nb;
    }
    if (nb >= 10) {
        my_put_int(nb / 10);
        my_putchar(nb % 10 + '0');
    } else
        my_putchar(nb + '0');
    return my_nbrlen(o_nb);
}
