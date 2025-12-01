/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"
#include <stdio.h>

static void my_put_float_silly(char *str, float nb)
{
    int pos = 0;
    int decimals;

    pos = my_itoa((int)nb, str);
    str[pos] = '.';
    pos++;
    decimals = (int)((nb - (int)nb) * 10);
    str[pos] = decimals + '0';
    pos++;
    str[pos] = '\0';
}

static void update_timer(radar_t *radar)
{
    sfTime time = sfClock_getElapsedTime(radar->clock);
    float seconds = sfTime_asSeconds(time);
    char timer_str[20];

    my_put_float_silly(timer_str, seconds);
    sfText_setString(radar->timer_text, timer_str);
}

static void update_aircrafts(radar_t *radar)
{
    size_t i;
    float delta = 1.0f / 60.0f;
    float seconds = sfTime_asSeconds(sfClock_getElapsedTime(radar->clock));

    for (i = 0; i < radar->aircraft_count; i++) {
        if (!radar->aircrafts[i]->active &&
            seconds >= radar->aircrafts[i]->delay)
            radar->aircrafts[i]->active = 1;
        if (radar->aircrafts[i]->active)
            update_aircraft_position(radar->aircrafts[i], delta);
    }
}

void update_radar(radar_t *radar)
{
    update_timer(radar);
    update_aircrafts(radar);
}
