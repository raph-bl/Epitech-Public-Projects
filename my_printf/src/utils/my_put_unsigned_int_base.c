/*
** EPITECH PROJECT, 2024
** my_put_unsigned_int_base.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

int my_put_unsigned_int_base(unsigned int nbr, char const *base)
{
    unsigned int base_len = my_strlen(base);
    int sum = 0;

    if (base_len < 2)
        return 0;
    if (nbr >= base_len) {
        sum += my_put_unsigned_int_base(nbr / base_len, base);
    }
    my_putchar(base[nbr % base_len]);
    return sum + 1;
}
