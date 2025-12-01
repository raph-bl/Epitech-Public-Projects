/*
** EPITECH PROJECT, 2024
** va_my_put_scinote.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

static int check_exponent(int exponent)
{
    if (exponent >= 0) {
        my_putchar('+');
    } else {
        my_putchar('-');
        exponent = -exponent;
    }
    return exponent;
}

static void check_if_majmin(printf_args_t *args)
{
    if (args->specifier == 'e')
        my_putchar('e');
    else
        my_putchar('E');
}

static void loop(int *sum, double *num)
{
    for (int i = 0; i < 6; i++) {
        *num *= 10.0;
        my_putchar((int)*num + '0');
        *sum += 1;
        *num -= (int)*num;
    }
}

static void loop_2(double *num, int *exponent)
{
    while (*num >= 10.0) {
        *num /= 10.0;
        *exponent += 1;
    }
    while (*num > 0.0 && *num < 1.0) {
        *num *= 10.0;
        *exponent -= 1;
    }
}

int va_my_put_scinote(printf_args_t *args)
{
    int sum = 0;
    double num = va_arg(args->args, double);
    int exponent = 0;

    loop_2(&num, &exponent);
    my_putchar((int)num + '0');
    my_putchar('.');
    num -= (int)num;
    num += 0.0000005;
    loop(&sum, &num);
    check_if_majmin(args);
    check_exponent(exponent);
    if (exponent < 10) {
        my_putchar('0');
        sum++;
    }
    my_put_int(exponent);
    return sum + 4 + my_nbrlen(exponent);
}
