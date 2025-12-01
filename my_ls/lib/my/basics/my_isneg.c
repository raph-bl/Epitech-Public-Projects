/*
** EPITECH PROJECT, 2024
** my_isneg.c
** File description:
** Return N if negative integer or P if null or positive
*/

#include "../my.h"

int my_isneg(int n)
{
    if (n >= 0) {
        my_putchar(80);
    } else {
        my_putchar(78);
    }
    return 0;
}
