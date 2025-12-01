/*
** EPITECH PROJECT, 2024
** my_print_alpha.c
** File description:
** Print alphabet
*/

#include "../my.h"

int my_print_alpha(void)
{
    int i = 97;

    for (; i < 123; i++) {
        my_putchar(i);
    }
    return 0;
}
