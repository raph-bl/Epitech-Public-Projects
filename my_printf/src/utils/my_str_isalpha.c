/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_str_isalpha.c
*/

int my_str_isalpha(char const *str)
{
    if (str[0] == '\0')
        return 0;
    for (int i = 0; str[i] != '\0'; i++) {
        if ((str[i] < 'A' || str[i] > 'Z') && (str[i] < 'a' || str[i] > 'z'))
            return 0;
    }
    return 1;
}
