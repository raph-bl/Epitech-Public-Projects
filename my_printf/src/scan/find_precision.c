/*
** EPITECH PROJECT, 2024
** find_precision.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

void find_precision_loop(const char *format, int index,
    printf_args_t *struct_args, char *precision)
{
    for (int k = 1; k < struct_args->params_len; k++) {
        if (my_char_isnum(format[index + k])) {
            precision[k - 1] = format[index + k];
        } else {
            precision[k - 1] = '\0';
            struct_args->precision = my_getnbr(precision);
            break;
        }
    }
}

void find_precision(const char *format, int i, printf_args_t *struct_args)
{
    char precision[10];
    int index;

    for (int j = 1; j < struct_args->params_len; j++) {
        if (format[i + j] == '.' && struct_args->precision == -1) {
            index = j + i;
            struct_args->precision = 0;
            find_precision_loop(format, index, struct_args, precision);
        }
    }
}
