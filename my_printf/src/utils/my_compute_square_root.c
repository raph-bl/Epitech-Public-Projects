/*
** EPITECH PROJECT, 2024
** my_compute_square_root.c
** File description:
** Returns square root
*/

#include "my_printf.h"

int my_compute_square_root(int nb)
{
    if (nb == 1) {
        return 1;
    }
    if (nb < 1) {
        return 0;
    }
    for (int i = 2; i * i <= nb; i++) {
        if (my_compute_power_rec(i, 2) == nb) {
            return i;
        }
    }
    return 0;
}
