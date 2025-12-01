/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** my_str_to_word_array.c
*/

#include "../my.h"
#include <stdlib.h>

int my_is_alphanum(char c)
{
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
        return 1;
    if (c >= '0' && c <= '9')
        return 1;
    return 0;
}

void end_arr(char **arr, int j, int k)
{
    if (k > 0) {
        arr[j][k] = '\0';
        j++;
    }
    arr[j] = NULL;
}

char **my_str_to_word_array(char const *str)
{
    int len = my_strlen(str);
    char **arr = malloc(sizeof(char *) * (len + 1));
    int j = 0;
    int k = 0;

    arr[j] = malloc(sizeof(char) * (len + 1));
    for (int i = 0; str[i] != '\0'; i++) {
        if (my_is_alphanum(str[i])) {
            arr[j][k] = str[i];
            k++;
        }
        if (k > 0 && !my_is_alphanum(str[i])) {
            arr[j][k] = '\0';
            j++;
            arr[j] = malloc(sizeof(char) * (len + 1));
            k = 0;
        }
    }
    end_arr(arr, j, k);
    return arr;
}
