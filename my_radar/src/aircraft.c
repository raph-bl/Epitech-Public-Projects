/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"
#include <stdlib.h>
#include <math.h>

static void init_aircraft_sprite(aircraft_t *aircraft)
{
    static sfTexture *plane_texture = NULL;
    sfVector2u texSize;

    aircraft->sprite = sfSprite_create();
    if (!aircraft->sprite)
        return;
    if (!plane_texture)
        plane_texture = sfTexture_createFromFile("resources/plane.png", NULL);
    if (!plane_texture)
        return;
    sfSprite_setTexture(aircraft->sprite, plane_texture, sfTrue);
    texSize = sfTexture_getSize(plane_texture);
    sfSprite_setScale(aircraft->sprite,
        (sfVector2f){20.0f / texSize.x, 20.0f / texSize.y});
    sfSprite_setOrigin(aircraft->sprite,
        (sfVector2f){(float)texSize.x / 2, (float)texSize.y / 2});
    sfSprite_setPosition(aircraft->sprite, aircraft->pos);
}

static void init_aircraft_hitbox(aircraft_t *aircraft)
{
    aircraft->hitbox = sfRectangleShape_create();
    if (!aircraft->hitbox)
        return;
    sfRectangleShape_setSize(aircraft->hitbox, (sfVector2f){20, 20});
    sfRectangleShape_setOrigin(aircraft->hitbox, (sfVector2f){10, 10});
    sfRectangleShape_setFillColor(aircraft->hitbox, sfTransparent);
    sfRectangleShape_setOutlineColor(aircraft->hitbox, sfGreen);
    sfRectangleShape_setOutlineThickness(aircraft->hitbox, 1);
    sfRectangleShape_setPosition(aircraft->hitbox, aircraft->pos);
}

static void init_aircraft_properties(aircraft_t *aircraft, float speed,
    int delay)
{
    aircraft->speed = speed;
    aircraft->delay = delay;
    aircraft->active = 0;
}

static void init_aircraft_positions(aircraft_t *aircraft, sfVector2f pos,
    sfVector2f dest)
{
    aircraft->pos = pos;
    aircraft->dest = dest;
}

aircraft_t *create_aircraft(sfVector2f pos, sfVector2f dest, float speed,
    int delay)
{
    aircraft_t *aircraft = malloc(sizeof(aircraft_t));

    if (!aircraft)
        return NULL;
    init_aircraft_positions(aircraft, pos, dest);
    init_aircraft_properties(aircraft, speed, delay);
    init_aircraft_sprite(aircraft);
    init_aircraft_hitbox(aircraft);
    return aircraft;
}

void destroy_aircraft(aircraft_t *aircraft)
{
    if (!aircraft)
        return;
    if (aircraft->sprite)
        sfSprite_destroy(aircraft->sprite);
    if (aircraft->hitbox)
        sfRectangleShape_destroy(aircraft->hitbox);
    free(aircraft);
}

static float get_distance(sfVector2f a, sfVector2f b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;

    return sqrt(dx * dx + dy * dy);
}

void update_aircraft_position(aircraft_t *aircraft, float delta)
{
    float dx;
    float dy;
    float distance;
    float angle;
    if (!aircraft->active)
        return;
    dx = aircraft->dest.x - aircraft->pos.x;
    dy = aircraft->dest.y - aircraft->pos.y;
    distance = get_distance(aircraft->pos, aircraft->dest);
    if (distance <= 1.0f) {
        aircraft->active = 0;
        return;
    }
    aircraft->pos.x += (dx / distance) * aircraft->speed * delta;
    aircraft->pos.y += (dy / distance) * aircraft->speed * delta;
    angle = atan2(dy, dx) * 180 / M_PI;
    sfSprite_setPosition(aircraft->sprite, aircraft->pos);
    sfSprite_setRotation(aircraft->sprite, angle);
    sfRectangleShape_setPosition(aircraft->hitbox, aircraft->pos);
    sfRectangleShape_setRotation(aircraft->hitbox, angle);
}

void draw_aircraft(aircraft_t *aircraft, sfRenderWindow *window,
    int show_sprites, int show_hitboxes)
{
    if (!aircraft->active)
        return;
    if (show_hitboxes && aircraft->hitbox)
        sfRenderWindow_drawRectangleShape(window, aircraft->hitbox, NULL);
    if (show_sprites && aircraft->sprite)
        sfRenderWindow_drawSprite(window, aircraft->sprite, NULL);
}
