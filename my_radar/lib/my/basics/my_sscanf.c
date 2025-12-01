/*
** EPITECH PROJECT, 2025
** my_scanf
** File description:
** partial myscanf
*/

#include "../my.h"
#include <stdarg.h>
#include <stddef.h>

static int skip_spaces(char **str)
{
    while (**str == ' ' || **str == '\t')
        (*str)++;
    return 0;
}

static float get_int_digit(char digit)
{
    return (digit - '0');
}

static float get_decimal_digit(char digit, float div)
{
    return (digit - '0') / div;
}

static float parse_decimal(char **str)
{
    float decimal = 0.0f;
    float div = 10.0f;

    (*str)++;
    while (**str >= '0' && **str <= '9') {
        decimal += get_decimal_digit(**str, div);
        div *= 10.0f;
        (*str)++;
    }
    return decimal;
}

static float parse_integer(char **str)
{
    float nb = 0.0f;

    while (**str >= '0' && **str <= '9') {
        nb = nb * 10.0f + get_int_digit(**str);
        (*str)++;
    }
    return nb;
}

static float get_number(char **str)
{
    float nb = 0.0f;
    int sign = 1;

    if (**str == '-') {
        sign = -1;
        (*str)++;
    }
    nb = parse_integer(str);
    if (**str == '.')
        nb += parse_decimal(str);
    return nb * sign;
}

static int handle_numeric(char **str, va_list *args, char type)
{
    float nb = get_number(str);

    if (type == 'f') {
        *va_arg(*args, float *) = nb;
        return 1;
    }
    if (type == 'd') {
        *va_arg(*args, int *) = (int)nb;
        return 1;
    }
    return 0;
}

static int parse_format(char **str, const char **format, va_list *args)
{
    (*format)++;
    if (**format == 'f' || **format == 'd')
        return handle_numeric(str, args, **format);
    return 0;
}

static int process_regular_char(char **str, const char **format)
{
    if (**format == ' ' || **format == '\t') {
        skip_spaces(str);
        return 1;
    }
    if (**format == **str) {
        (*str)++;
        return 1;
    }
    return 0;
}

int my_sscanf(char *str, const char *format, ...)
{
    va_list args;
    int matches = 0;
    char *s = str;

    va_start(args, format);
    while (*s && *format) {
        if (*format != '%' && !process_regular_char(&s, &format))
            break;
        if (*format == '%') {
            matches += parse_format(&s, &format, &args);
            format++;
        } else
            format++;
    }
    va_end(args);
    return matches;
}
