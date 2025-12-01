/*
** EPITECH PROJECT, 2024
** va_my_putstr.c
** File description:
** DESCRIPTION
*/

#include "../my.h"

char *my_uint_base_str(unsigned int nbr, char const *base)
{
    int base_len = my_strlen(base);
    int i = 0;
    char *str = malloc(sizeof(char) * 100);

    if (nbr != 0) {
        while (nbr != 0) {
            str[i] = base[nbr % base_len];
            nbr = nbr / base_len;
            i++;
        }
    } else {
        str[i] = '0';
        i++;
    }
    str[i] = '\0';
    return (my_revstr(str));
}

int va_my_put_hexa(printf_args_t *a)
{
    char *str = malloc(sizeof(char) * 100);
    char *base_min = "0123456789abcdef";
    char *base_maj = "0123456789ABCDEF";

    if (a->specifier == 'X')
        str = my_uint_base_str(va_arg(a->args, unsigned int), base_maj);
    if (a->specifier == 'x')
        str = my_uint_base_str(va_arg(a->args, unsigned int), base_min);
    if (is_in_flags(a, '#')) {
        my_putstr("0x");
        a->width -= 2;
        a->printed_chars_count += 2;
    }
    for (int i = 0; i < a->width - my_strlen(str); i++) {
        my_putchar('0');
        a->printed_chars_count++;
    }
    my_putstr(str);
    a->printed_chars_count += my_strlen(str);
    return 0;
}
