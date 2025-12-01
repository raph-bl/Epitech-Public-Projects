/*
** EPITECH PROJECT, 2024
** va_my_putfloat.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

static int my_put_float_va2(int d, int precision)
{
    int i = 0;
    char digits[20];

    for (int j = 0; j < precision; j++) {
        digits[j] = d % 10 + '0';
        d /= 10;
    }
    for (int j = precision - 1; j >= 0; j--) {
        my_putchar(digits[j]);
        i++;
    }
    return i;
}

static int define_rounded(double f, int precision)
{
    double fractional = f - (int)f;
    double multiplier = 1;
    int rounded;
    int d;

    for (int j = 0; j < precision; j++)
        multiplier *= 10;
    rounded = fractional * multiplier + 0.5;
    d = (int)rounded;
    if (d >= multiplier)
        d = 0;
    return d;
}

int va_my_put_float(printf_args_t *args)
{
    double f = va_arg(args->args, double);
    int i = (int)f;
    int precision = (args->precision != -1) ? args->precision : 6;
    int d = define_rounded(f, precision);

    my_put_int(i);
    if (precision == 0) {
        my_put_float_va2(d, precision);
        return my_nbrlen(i);
    }
    my_putchar('.');
    return my_put_float_va2(d, precision) + my_nbrlen(i) + 1;
}
