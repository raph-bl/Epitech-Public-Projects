/*
** EPITECH PROJECT, 2024
** my_is_prime.c
** File description:
** Returns 1 if the number is prime, 0 if not
*/

int my_is_prime(int nb)
{
    if (nb < 2) {
        return 0;
    }
    for (int i = 2; i * i <= nb; i++) {
        if (nb % i == 0) {
            return 0;
        }
    }
    return 1;
}
