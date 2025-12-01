/*
** EPITECH PROJECT, 2024
** my_put_double_base.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

#include <stdio.h>

int my_put_double_base(double f, char const *base)
{
    int nb = (int)(f * 1000000);

    my_put_int_base(nb, base);
    return (0);
}
