/*
** EPITECH PROJECT, 2024
** va_my_putchar.c
** File description:
** DESCRIPTION
*/


#include "../my.h"

static void before(printf_args_t *a)
{
    if (a->width > 0 && !is_in_flags(a, '-') && !is_in_flags(a, '0')) {
        for (int i = 0; i < a->width - 1; i++) {
            my_putchar(' ');
            a->printed_chars_count++;
        }
    }
}

int va_my_putchar(printf_args_t *args)
{
    char c = va_arg(args->args, int);

    before(args);
    my_putchar(c);
    args->printed_chars_count++;
    return 0;
}
