/*
** EPITECH PROJECT, 2024
** parse_type_2.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

#include <stdarg.h>

int my_base_len(long long int nbr, int base_len)
{
    int len = 0;

    if (nbr == 0)
        return 1;
    while (nbr != 0) {
        nbr = nbr / base_len;
        len++;
    }
    return len;
}

int va_my_put_pointer(printf_args_t *args)
{
    long long int ptr = va_arg(args->args, long long int);

    if (ptr == 0)
        return my_putstr("(nil)") + 5;
    if (is_in_flags(args, '-') && args->width > 0) {
        my_putstr("0x");
        my_put_long_long_int_base(ptr, "0123456789abcdef");
        for (int i = 0; i < args->width - 14; i++)
            my_putchar(' ');
        return 14 + args->width;
    }
    if (args->width > 0) {
        for (int i = 0; i < args->width - 14; i++)
            my_putchar(' ');
    }
    my_putstr("0x");
    my_put_long_long_int_base(ptr, "0123456789abcdef");
    return 14 + args->width;
}
