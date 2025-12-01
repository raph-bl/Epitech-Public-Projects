/*
** EPITECH PROJECT, 2024
** va_my_put_nbr.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

static void before(int arg, printf_args_t *a)
{
    if (a->width > 0 && !is_in_flags(a, '-') && !is_in_flags(a, '0')) {
        for (int i = 0; i < a->width - my_nbrlen(arg); i++) {
            my_putchar(' ');
            a->printed_chars_count++;
        }
    }
    if (is_in_flags(a, '+') && arg >= 0) {
        my_putchar('+');
        a->printed_chars_count++;
        a->width--;
    } else if (is_in_flags(a, ' ') && arg >= 0) {
        my_putchar(' ');
        a->printed_chars_count++;
        a->width--;
    }
    for (int i = 0; i < a->width - my_nbrlen(arg) && is_in_flags(a, '0')
        ; i++) {
        my_putchar('0');
        a->printed_chars_count++;
    }
}

static void precision(int arg, printf_args_t *args)
{
    if (args->precision != -1) {
        for (int i = 0; i < args->precision - my_nbrlen(arg); i++) {
            my_putchar('0');
            args->printed_chars_count++;
        }
    }
}

static void after(int arg, printf_args_t *args)
{
    if (args->width > 0 && is_in_flags(args, '-')) {
        for (int i = 0; i < args->width - my_nbrlen(arg); i++) {
            my_putchar(' ');
            args->printed_chars_count++;
        }
    }
}

int va_my_put_int(printf_args_t *args)
{
    int nb = va_arg(args->args, int);

    before(nb, args);
    precision(nb, args);
    args->printed_chars_count += my_put_int(nb);
    after(nb, args);
    return 0;
}
