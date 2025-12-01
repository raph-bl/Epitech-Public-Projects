/*
** EPITECH PROJECT, 2024
** find_length_modifier.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

const char length_modifier[] = {'h', 'l', 'L', 'j', 'z', 't'};

int find_length_modifier_condition(const char *format, int index,
    printf_args_t *struct_args, int k)
{
    if (format[index] == length_modifier[k]) {
        if ((format[index] == 'h' && format[index + 1] == 'h') ||
            (format[index] == 'l' && format[index + 1] == 'l')) {
            struct_args->length[0] = format[index];
            struct_args->length[1] = format[index + 1];
            struct_args->length[2] = '\0';
            return 2;
        } else {
            struct_args->length[0] = format[index];
            struct_args->length[1] = '\0';
            return 1;
        }
    }
    return 0;
}

void find_length_modifier(const char *format, int i,
    printf_args_t *struct_args)
{
    int index;

    for (int j = 1; j < struct_args->params_len; j++) {
        for (int k = 0; length_modifier[k] != '\0'; k++) {
            index = i + j;
            j += find_length_modifier_condition(format, index, struct_args, k);
        }
    }
}
