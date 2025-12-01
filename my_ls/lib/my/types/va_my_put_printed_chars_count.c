/*
** EPITECH PROJECT, 2024
** va_my_put_printed_chars_count.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

int va_my_put_printed_chars_count(printf_args_t *args)
{
    int *n = va_arg(args->args, int *);

    *n = args->printed_chars_count;
    return 0;
}
