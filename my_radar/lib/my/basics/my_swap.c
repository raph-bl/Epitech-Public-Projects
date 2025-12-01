/*
** EPITECH PROJECT, 2024
** my_swap.c
** File description:
** Swap
*/

#include "../my.h"

void my_swap(int *a, int *b)
{
    int t = *b;

    *b = *a;
    *a = t;
}
