/*
** EPITECH PROJECT, 2024
** my_print_comb2.c
** File description:
** x
*/

#include "my_printf.h"

int my_print_comb2_conditions(int a, int b, int c, int d)
{
    if (a + b < c + d && a + b + c + d < 35) {
        my_putchar(48 + a);
        my_putchar(48 + b);
        my_putchar(32);
        my_putchar(48 + c);
        my_putchar(48 + d);
        my_putchar(44);
        my_putchar(32);
    }
    if (a + b + c + d == 35) {
        my_putchar(48 + a);
        my_putchar(48 + b);
        my_putchar(32);
        my_putchar(48 + c);
        my_putchar(48 + d);
    }
    return 0;
}

int my_print_comb2_loops(int a, int b)
{
    for (int c = 0; c < 10; c++) {
        for (int d = 0; d < 10; d++) {
            my_print_comb2_conditions(a, b, c, d);
        }
    }
    return 0;
}

int my_print_comb2(void)
{
    for (int a = 0; a < 10; a++) {
        for (int b = 0; b < 9; b++) {
            my_print_comb2_loops(a, b);
        }
    }
    return 0;
}
