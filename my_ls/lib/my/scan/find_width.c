/*
** EPITECH PROJECT, 2024
** find_width.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

void find_width_loop(const char *format, int index,
    printf_args_t *struct_args, char *width)
{
    for (int k = 0; k < struct_args->params_len; k++) {
        if (my_char_isnum(format[index + k])) {
            width[k] = format[index + k];
        } else {
            width[k] = '\0';
            struct_args->width = my_getnbr(width);
            break;
        }
    }
}

void find_width(const char *format, int i,
    printf_args_t *struct_args)
{
    char width[10];
    int index;

    for (int j = 1; j < struct_args->params_len; j++) {
        if (format[i + j] == '*' && struct_args->width == 0) {
            struct_args->width = va_arg(struct_args->args, int);
            j++;
            continue;
        }
        if (my_char_isnum(format[i + j]) && format[i + j - 1] != '.'
            && struct_args->width == 0 && format[i + j] != '0') {
            index = j + i;
            find_width_loop(format, index, struct_args, width);
        }
    }
}
