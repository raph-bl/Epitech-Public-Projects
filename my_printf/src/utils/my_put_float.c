/*
** EPITECH PROJECT, 2024
** my_put_float.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

void my_put_float(double f)
{
    int i = f;
    int d = (f - i) * 1000000;

    my_put_int(i);
    my_putchar('.');
    my_put_int(d);
}
