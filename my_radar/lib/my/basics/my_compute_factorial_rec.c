/*
** EPITECH PROJECT, 2024
** my_compute_factorial_rec.c
** File description:
** Returns recursively the factorial of the number given as a parameter
*/

int my_compute_factorial_rec(int nb)
{
    if (nb < 0 || nb > 12) {
        return 0;
    }
    if (nb < 2) {
        return 1;
    }
    return nb * my_compute_factorial_rec(nb - 1);
}
