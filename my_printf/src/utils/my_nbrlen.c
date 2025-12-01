/*
** EPITECH PROJECT, 2024
** my_nbrlen.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

int my_nbrlen(int nb)
{
    int len = 0;

    if (nb < 0) {
        len++;
        nb = nb * -1;
    }
    while (nb >= 10) {
        nb = nb / 10;
        len++;
    }
    len++;
    return len;
}
