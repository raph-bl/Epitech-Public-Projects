/*
** EPITECH PROJECT, 2024
** my_print_revalpha.c
** File description:
** Print alphabet in reverse
*/

#include "my_printf.h"

int my_print_revalpha(void)
{
    int i = 122;

    for (; i > 96; i--) {
        my_putchar(i);
    }
    return 0;
}
