/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"
#include <string.h>

static void print_usage(void)
{
    my_putstr("Air traffic simulation panel\n\n");
    my_putstr("USAGE\n");
    my_putstr("  ./my_radar [OPTIONS] path_to_script\n\n");
    my_putstr("    path_to_script    The path to the script file.\n\n");
    my_putstr("OPTIONS\n");
    my_putstr("  -h                print the usage and quit.\n\n");
    my_putstr("USER INTERACTIONS\n");
    my_putstr("  'L' key          enable/disable hitboxes and areas.\n");
    my_putstr("  'S' key          enable/disable sprites.\n");
}

static int init_radar(int argc, char **argv, radar_t **radar)
{
    if (argc != 2 || (argc == 2 && my_strcmp(argv[1], "-h") == 0)) {
        print_usage();
        return (argc == 2) ? 0 : ERROR_CODE;
    }
    *radar = create_radar();
    if (!*radar) {
        my_putstr("Failed to initialize radar\n");
        return ERROR_CODE;
    }
    if (parse_script(*radar, argv[1]) != 0) {
        my_putstr("Failed to parse script file\n");
        destroy_radar(*radar);
        return ERROR_CODE;
    }
    return 0;
}

int main(int argc, char **argv)
{
    radar_t *radar;
    int result = init_radar(argc, argv, &radar);

    if (result != 0)
        return result;
    while (sfRenderWindow_isOpen(radar->window)) {
        handle_events(radar);
        update_radar(radar);
        draw_radar(radar);
    }
    destroy_radar(radar);
    return 0;
}
