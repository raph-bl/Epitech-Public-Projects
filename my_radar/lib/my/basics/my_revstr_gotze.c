/*
** EPITECH PROJECT, 2024
** gotze mathafack
** File description:
** 20-1 19 le s
*/

#include "../my.h"

void my_reverse_str_goat(char *str, int len)
{
    int i = 0;
    char temp;

    for (i = 0; i < len / 2; i++) {
        temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}
