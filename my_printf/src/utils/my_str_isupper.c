/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_str_isupper.c
*/

int my_str_isupper(char const *str)
{
    if (str[0] == '\0')
        return 0;
    for (int i = 0; str[i] != '\0'; i++) {
        if (str[i] < 'A' || str[i] > 'Z')
            return 0;
    }
    return 1;
}
