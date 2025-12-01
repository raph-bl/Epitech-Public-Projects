/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** utils.c
*/

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "my.h"

int my_perror(char *str)
{
    perror(str);
    return 84;
}
