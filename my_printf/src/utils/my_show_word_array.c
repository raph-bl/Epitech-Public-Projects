/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_show_word_array.c
*/

#include "my_printf.h"

int my_show_word_array(char *const *tab)
{
    for (int i = 0; tab[i] != 0; i++) {
        my_putstr(tab[i]);
        my_putchar('\n');
    }
    return 0;
}
