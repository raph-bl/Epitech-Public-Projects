/*
** EPITECH PROJECT, 2024
** my_print_comb.c
** File description:
** x
*/

#include "../my.h"

int my_print_comb_third_loop(int a, int b)
{
    int c = 0;

    for (; c < 10; c++) {
        if (a < b && a < c && b < c) {
            my_putchar(48 + a);
            my_putchar(48 + b);
            my_putchar(48 + c);
            my_putchar(44);
            my_putchar(32);
        }
        if (a == 7 && b == 8 && c == 9) {
            my_putchar(48 + a);
            my_putchar(48 + b);
            my_putchar(48 + c);
            return 0;
        }
    }
    return 0;
}

int my_print_comb_second_loop(int a)
{
    int b = 0;

    for (; b < 10; b++) {
        my_print_comb_third_loop(a, b);
    }
    return 0;
}

int my_print_comb(void)
{
    int a = 0;

    for (; a < 10; a++) {
        my_print_comb_second_loop(a);
    }
    return 0;
}
