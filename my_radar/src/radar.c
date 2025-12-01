/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

static void init_window(radar_t *radar)
{
    sfVideoMode mode = {WINDOW_WIDTH, WINDOW_HEIGHT, 32};

    radar->window = sfRenderWindow_create(mode, "My Radar",
        sfResize | sfClose, NULL);
    if (!radar->window)
        return;
    sfRenderWindow_setFramerateLimit(radar->window, 60);
}

static void init_gui(radar_t *radar)
{
    radar->clock = sfClock_create();
    radar->font = sfFont_createFromFile("resources/font.ttf");
    if (!radar->font)
        return;
    radar->timer_text = sfText_create();
    if (!radar->timer_text)
        return;
    sfText_setFont(radar->timer_text, radar->font);
    sfText_setCharacterSize(radar->timer_text, 30);
    sfText_setPosition(radar->timer_text, (sfVector2f)
        {WINDOW_WIDTH - 100, 10});
}

radar_t *create_radar(void)
{
    radar_t *radar = malloc(sizeof(radar_t));

    if (!radar)
        return NULL;
    radar->aircrafts = NULL;
    radar->aircraft_count = 0;
    radar->towers = NULL;
    radar->tower_count = 0;
    radar->show_sprites = 1;
    radar->show_hitboxes = 1;
    init_window(radar);
    init_gui(radar);
    return radar;
}

void destroy_radar(radar_t *radar)
{
    size_t i;

    if (!radar)
        return;
    for (i = 0; i < radar->aircraft_count; i++)
        destroy_aircraft(radar->aircrafts[i]);
    for (i = 0; i < radar->tower_count; i++)
        destroy_tower(radar->towers[i]);
    free(radar->aircrafts);
    free(radar->towers);
    if (radar->timer_text)
        sfText_destroy(radar->timer_text);
    if (radar->font)
        sfFont_destroy(radar->font);
    if (radar->clock)
        sfClock_destroy(radar->clock);
    if (radar->window)
        sfRenderWindow_destroy(radar->window);
    free(radar);
}
