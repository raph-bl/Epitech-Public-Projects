/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"

static void draw_gui(radar_t *radar)
{
    sfRenderWindow_drawText(radar->window, radar->timer_text, NULL);
}

static void draw_entities(radar_t *radar)
{
    size_t i;

    for (i = 0; i < radar->tower_count; i++)
        draw_tower(radar->towers[i], radar->window,
            radar->show_sprites, radar->show_hitboxes);
    for (i = 0; i < radar->aircraft_count; i++)
        draw_aircraft(radar->aircrafts[i], radar->window,
            radar->show_sprites, radar->show_hitboxes);
}

void draw_radar(radar_t *radar)
{
    sfRenderWindow_clear(radar->window, sfBlack);
    draw_gui(radar);
    draw_entities(radar);
    sfRenderWindow_display(radar->window);
}
