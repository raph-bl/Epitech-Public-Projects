/*
** EPITECH PROJECT, 2024
** my_put_unsigned_int.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

int my_put_unsigned_int(unsigned int nb)
{
    int sum = 0;

    if (nb >= 10) {
        sum += my_put_unsigned_int(nb / 10);
        my_putchar(nb % 10 + '0');
        sum++;
    } else {
        my_putchar(nb + '0');
        sum++;
    }
    return sum;
}
