/*
** EPITECH PROJECT, 2024
** va_my_put_scinote_auto.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

int my_put_double_auto(double f)
{
    int integer_part = (int)f;
    int decimal_part = (f - integer_part) * 1000000;
    int sum = 0;

    for (int i = 0; decimal_part % 10 == 0; i++)
        decimal_part /= 10;
    for (int j = 0; my_nbrlen(decimal_part) > 5; j++)
        decimal_part /= 10;
    sum += my_put_int(integer_part);
    my_putchar('.');
    return sum + my_put_int(decimal_part) + 1;
}

static int my_double_len(double f)
{
    int integer_part = (int)f;
    int decimal_part = (f - integer_part) * 1000000;
    int sum = 0;

    for (int i = 0; decimal_part % 10 == 0; i++)
        decimal_part /= 10;
    for (int j = 0; my_nbrlen(decimal_part) > 5; j++)
        decimal_part /= 10;
    sum += my_nbrlen(integer_part);
    sum++;
    sum += my_nbrlen(decimal_part);
    return (sum);
}

int condition1(printf_args_t *args, double f, int f_len)
{
    my_put_double_auto(f);
    for (int i = 0; i < args->width - f_len; i++)
        my_putchar(' ');
    return (args->width > my_floatlen(f) ? args->width : my_floatlen(f));
}

int condition2(printf_args_t *args, double f, int f_len)
{
    for (int i = 0; i < args->width - f_len; i++)
        my_putchar('0');
    my_put_double_auto(f);
    return (args->width);
}

int condition3(printf_args_t *args, double f, int f_len)
{
    for (int i = 0; i < args->width - f_len; i++)
        my_putchar(' ');
    my_put_double_auto(f);
    return (args->width);
}

int va_my_put_scinote_auto(printf_args_t *a)
{
    double f = va_arg(a->args, double);
    int f_len = my_double_len(f);

    if (is_in_flags(a, '-'))
        return condition1(a, f, f_len);
    if (a->width > 0 && is_in_flags(a, '0'))
        return condition2(a, f, f_len);
    if (a->width > 0)
        return condition3(a, f, f_len);
    if ((is_in_flags(a, ' ') && f >= 0) || (is_in_flags(a, '+') && f < 0)) {
        my_putchar(' ');
        my_put_double_auto(f);
        return (f_len + 1);
    }
    if (is_in_flags(a, '+')) {
        my_putchar('+');
        my_put_double_auto(f);
        return (f_len + 1);
    }
    return my_put_double_auto(f);
}
