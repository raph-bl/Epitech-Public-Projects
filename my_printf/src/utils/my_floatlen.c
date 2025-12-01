/*
** EPITECH PROJECT, 2024
** my_floatlen.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

int my_floatlen(double f)
{
    int len = 0;

    if (f < 0) {
        len++;
        f = -f;
    }
    len += my_nbrlen((int)f);
    len++;
    len += my_nbrlen((int)((f - (int)f) * 1000000));
    return len;
}
