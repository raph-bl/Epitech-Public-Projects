/*
** EPITECH PROJECT, 2024
** my_strlen.c
** File description:
** Return string length
*/

int my_strlen(char const *str)
{
    int count = 0;

    while (str[count] != '\0') {
        count++;
    }
    return count;
}
