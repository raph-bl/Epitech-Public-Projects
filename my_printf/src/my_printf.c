/*
** EPITECH PROJECT, 2024
** my_printf.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

const my_printf_t type[] = {
    {'c', va_my_putchar},
    {'d', va_my_put_int},
    {'i', va_my_put_int},
    {'s', va_my_put_str},
    {'f', va_my_put_float},
    {'F', va_my_put_float},
    {'%', va_my_put_percentage},
    {'u', va_my_put_unsigned_int},
    {'o', va_my_put_octal},
    {'p', va_my_put_pointer},
    {'x', va_my_put_hexa},
    {'X', va_my_put_hexa},
    {'e', va_my_put_scinote},
    {'E', va_my_put_scinote},
    {'n', va_my_put_printed_chars_count},
    {'g', va_my_put_scinote_auto},
    {'G', va_my_put_scinote_auto},
};

int run_specifier_function(printf_args_t *struct_args)
{
    for (int j = 0; type[j].specifier != 0; j++) {
        if (type[j].specifier == struct_args->specifier) {
            return (type[j].function(struct_args));
        }
    }
    return 0;
}

void define_struct(printf_args_t *struct_args)
{
    struct_args->flag = malloc(sizeof(char) * 6);
    for (int i = 0; i < 6; i++) {
        struct_args->flag[i] = '\0';
    }
    struct_args->width = 0;
    struct_args->precision = -1;
    struct_args->length = malloc(sizeof(char) * 2);
    struct_args->length[0] = '\0';
    struct_args->specifier = '\0';
}

void apply_format(const char *format, int i, printf_args_t *struct_args)
{
    define_struct(struct_args);
    find_specifier(format, i, struct_args);
    if (struct_args->params_len > 1) {
        find_flag(format, i, struct_args);
        find_width(format, i, struct_args);
        find_precision(format, i, struct_args);
        find_length_modifier(format, i, struct_args);
    }
    struct_args->printed_chars_count += run_specifier_function(struct_args);
}

int my_printf(const char *format, ...)
{
    int temp = 0;
    printf_args_t *struct_args = malloc(sizeof(printf_args_t));

    if (format[0] == '%' && format[1] == '\0')
        return -1;
    va_start(struct_args->args, format);
    struct_args->printed_chars_count = 0;
    for (int i = 0; format[i] != '\0'; i++) {
        struct_args->params_len = 0;
        if (format[i] == '%') {
            apply_format(format, i, struct_args);
            i += struct_args->params_len;
            continue;
        }
        my_putchar(format[i]);
        struct_args->printed_chars_count++;
    }
    temp = struct_args->printed_chars_count;
    free(struct_args);
    return temp;
}
