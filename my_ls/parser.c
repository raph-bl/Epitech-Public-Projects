/*
** EPITECH PROJECT, 2024
** Untitled (Workspace)
** File description:
** parser.c
*/

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "my.h"

const char options[] = {'a', 'A', 'b', 'B', 's', 'S', 'l', 'i',
    'g', '1', 'm', 't', 'd', '\0'};

static int find_minus_char(int argc, char **argv)
{
    int count = 0;

    for (int i = 0; i < argc; i++) {
        if (my_strstr(argv[i], "-")) {
            count++;
        }
    }
    return count;
}

static int nested_condition(char *str, char *dest, char const *tofind, int i)
{
    for (int j = 0; options[j] != '\0'; j++) {
        if (str[i + 1] == options[j]) {
            tofind = (char *)str[i + 1];
            my_strcat(dest, &tofind);
        }
    }
    return 0;
}

static int parse_options_bis(char *str, char *dest, char const *tofind, int i)
{
    if (str[i] == '-') {
        nested_condition(str, dest, tofind, i);
    }
    return 0;
}

bool find_char(const char *str, char c)
{
    for (int i = 0; str[i] != '\0'; i++) {
        if (str[i] == c)
            return true;
    }
    return false;
}

char *parse_options(int argc, char **argv)
{
    char *str = concat_params(argc, argv);
    char *dest;
    char const *tofind = 0;

    dest = malloc((my_strlen(str) + 1) * sizeof(char));
    for (int i = 0; i < my_strlen(str); i++)
        dest[i] = 0;
    if (find_minus_char(argc, argv) >= 1) {
        dest[my_strlen(str)] = 0;
        for (int i = 0; str[i] != '\0'; i++)
            parse_options_bis(str, dest, tofind, i);
        return dest;
    }
    return NULL;
}

char *parse_path_bis(char *start, char *slash, char *end)
{
    while (*start != '\0') {
        if (*start == '/') {
            start++;
            end = my_strchr(start, ' ');
            end_of_str(end);
            slash = malloc((my_strlen(start) + 2) * sizeof(char));
            my_strcpy(slash, "/");
            my_strcat(slash, start);
            end_of_str_bis(end);
            break;
        }
        start++;
    }
    return slash;
}

char *parse_path(int argc, char **argv)
{
    char *str = concat_params(argc, argv);
    char *start = my_strstr(str, "./my_ls");
    char *slash = 0;
    char *end = 0;

    if (start != NULL) {
        start += my_strlen("./my_ls");
        return parse_path_bis(start, slash, end);
    } else {
        return NULL;
    }
    return 0;
}

static int my_conditionnal_forest_bobigny(char *str,
    int argc, char **argv)
{
    if (find_char(str, 'a')) {
        if (parse_path(argc, argv) == NULL)
            print_dir(opendir("./"), true);
        else
            print_dir(opendir(parse_path(argc, argv)), true);
        my_putchar('\n');
        return 0;
    }
    my_conditionnal_forest_meudon(str, argc, argv);
    return 0;
}

static int my_conditionnal_forest_boulognes(char *str,
    int argc, char **argv)
{
    if (find_char(str, 'd') && find_char(str, 'l')) {
        display_dl_flag(argc, argv);
        return 0;
    }
    if (find_char(str, 'l') && find_char(str, 'a')) {
        display_lsl(argc, argv, true);
        return 0;
    }
    if (find_char(str, 'l')) {
        display_lsl(argc, argv, false);
        return 0;
    }
    my_conditionnal_forest_bobigny(str, argc, argv);
    return 0;
}

int parser(int argc, char **argv)
{
    char *str = parse_options(argc, argv);
    DIR *dir;

    if (str)
        my_conditionnal_forest_boulognes(str, argc, argv);
    else {
        dir = opendir(parse_path(argc, argv));
        print_dir(dir, false);
    }
    return 0;
}
