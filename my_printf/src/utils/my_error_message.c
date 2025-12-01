/*
** EPITECH PROJECT, 2024
** my_error_message.c
** File description:
** DESCRIPTION
*/

#include "my_printf.h"
#include <unistd.h>

const char *ERROR_COLOR = "\033[0;31m";
const char *RESET = "\033[0m";

void my_error_message(char *message)
{
    write(2, ERROR_COLOR, my_strlen(ERROR_COLOR));
    write(2, message, my_strlen(message));
    write(2, RESET, my_strlen(RESET));
}
