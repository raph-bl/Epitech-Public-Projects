/*
** EPITECH PROJECT, 2024
** my_print_digits.c
** File description:
** Print digits
*/

#include "../my.h"

int my_print_digits(void)
{
    int i = 48;

    for (; i < 58; i++) {
        my_putchar(i);
    }
    return 0;
}
