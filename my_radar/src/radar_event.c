/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"

static void handle_keyboard_events(radar_t *radar, sfEvent event)
{
    if (event.type != sfEvtKeyPressed)
        return;
    if (event.key.code == sfKeyL)
        radar->show_hitboxes = !radar->show_hitboxes;
    if (event.key.code == sfKeyS)
        radar->show_sprites = !radar->show_sprites;
}

void handle_events(radar_t *radar)
{
    sfEvent event;

    while (sfRenderWindow_pollEvent(radar->window, &event)) {
        if (event.type == sfEvtClosed)
            sfRenderWindow_close(radar->window);
        handle_keyboard_events(radar, event);
    }
}
