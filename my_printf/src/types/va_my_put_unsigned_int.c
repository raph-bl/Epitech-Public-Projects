/*
** EPITECH PROJECT, 2024
** va_my_put_unsigned_int.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"

int va_my_put_unsigned_int(printf_args_t *args)
{
    return my_put_unsigned_int(va_arg(args->args, unsigned int));
}
