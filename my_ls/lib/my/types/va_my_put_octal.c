/*
** EPITECH PROJECT, 2024
** va_my_putstr.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

#include <stdarg.h>

int va_my_put_octal(printf_args_t *args)
{
    int o;
    int sum = 0;

    o = va_arg(args->args, int);
    if (is_in_flags(args, '#') && o != 0) {
        my_putchar('0');
        sum++;
    }
    sum += my_put_unsigned_int_base(o, "01234567");
    return sum;
}
