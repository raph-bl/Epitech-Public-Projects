/*
** EPITECH PROJECT, 2024
** find_specifier.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

const char specifiers[] = {'c', 'd', 'i', 's', 'f', 'F', '%', 'u', 'o', 'p',
    'x', 'X', 'e', 'E', 'n', 'g', 'G'};

int find_specifier_loop(const char *format, int i, int j,
    printf_args_t *struct_args)
{
    for (int k = 0; specifiers[k] != 0; k++) {
        if (specifiers[k] == format[i + j]) {
            struct_args->specifier = format[i + j];
            return j;
        }
    }
    return struct_args->params_len;
}

void find_specifier(const char *format, int i, printf_args_t *args)
{
    for (int j = 1; format[i + j] != '\0'
        && args->specifier == '\0'; j++) {
        args->params_len = find_specifier_loop(format,
            i, j, args);
    }
    if (args->specifier == '\0') {
        args->params_len = 1;
        my_putchar('%');
        args->printed_chars_count++;
    }
}
