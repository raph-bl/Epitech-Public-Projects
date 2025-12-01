/*
** EPITECH PROJECT, 2024
** va_my_putstr.c
** File description:
** DESCRIPTION
*/


#include "my_printf.h"

static void my_put_str(char *str, printf_args_t *a)
{
    a->precision = (a->precision == -1) ? my_strlen(str) : a->precision;
    for (int i = 0; str[i] != '\0' && i < a->precision; i++) {
        my_putchar(str[i]);
        a->printed_chars_count++;
    }
}

static char *is_null(char *str)
{
    if (str == NULL) {
        str = malloc(sizeof(char) * 7);
        str = "(null)";
    }
    return str;
}

static void before(char *str, printf_args_t *a)
{
    if (!is_in_flags(a, '-') && !is_in_flags(a, '0')) {
        for (int i = 0; i < a->width - my_strlen(str); i++) {
            my_putchar(' ');
            a->printed_chars_count++;
        }
    }
}

int va_my_put_str(printf_args_t *args)
{
    char *str = va_arg(args->args, char *);

    str = is_null(str);
    before(str, args);
    my_put_str(str, args);
    return 0;
}
