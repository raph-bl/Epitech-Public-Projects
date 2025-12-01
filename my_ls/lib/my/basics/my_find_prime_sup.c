/*
** EPITECH PROJECT, 2024
** my_find_prime_sup.c
** File description:
** Returns the smallest prime number
*/

#include "../my.h"

int my_find_prime_sup(int nb)
{
    if (nb < 2) {
        return 2;
    }
    while (!my_is_prime(nb)) {
        nb++;
    }
    return nb;
}
