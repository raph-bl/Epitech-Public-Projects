/*
** EPITECH PROJECT, 2024
** find_flag.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

const char flags[] = {'#', '0', '-', ' ', '+', '*'};

static int is_allowed_number(char c)
{
    if (c >= '1' && c <= '9') {
        return 0;
    }
    return 1;
}

static int is_a_flag(char c)
{
    for (int i = 0; flags[i] != '\0'; i++) {
        if (c == flags[i]) {
            return 1;
        }
    }
    return 0;
}

int is_in_flags(printf_args_t *struct_args, char c)
{
    for (int i = 0; struct_args->flag[i] != '\0'; i++) {
        if (struct_args->flag[i] == c) {
            return 1;
        }
    }
    return 0;
}

void find_flag(const char *format, int i, printf_args_t *struct_args)
{
    int list_index = 0;

    for (int j = 1; format[i + j] != '\0'
        && is_allowed_number(format[i + j]); j++) {
        if (is_a_flag(format[i + j])) {
            struct_args->flag[list_index] = format[i + j];
            list_index++;
        }
    }
}
