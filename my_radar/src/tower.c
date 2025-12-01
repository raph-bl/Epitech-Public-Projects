/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** myradar sourcefile
*/

#include "my.h"
#include <stdlib.h>

static void init_tower_sprite(tower_t *tower)
{
    static sfTexture *tower_texture = NULL;

    tower->sprite = sfSprite_create();
    if (!tower->sprite)
        return;
    if (!tower_texture)
        tower_texture = sfTexture_createFromFile("resources/tower.png", NULL);
    if (!tower_texture)
        return;
    sfSprite_setTexture(tower->sprite, tower_texture, sfTrue);
    sfSprite_setScale(tower->sprite, (sfVector2f){0.15f, 0.15f});
    sfSprite_setOrigin(tower->sprite, (sfVector2f){32, 32});
    sfSprite_setPosition(tower->sprite, tower->pos);
}

static void init_tower_area(tower_t *tower)
{
    tower->area = sfCircleShape_create();
    if (!tower->area)
        return;
    sfCircleShape_setRadius(tower->area, tower->radius);
    sfCircleShape_setOrigin(tower->area,
        (sfVector2f){tower->radius, tower->radius});
    sfCircleShape_setPosition(tower->area, tower->pos);
    sfCircleShape_setFillColor(tower->area, sfColor_fromRGBA(0, 0, 255, 64));
    sfCircleShape_setOutlineColor(tower->area, sfBlue);
    sfCircleShape_setOutlineThickness(tower->area, 1);
}

tower_t *create_tower(float x, float y, float radius)
{
    tower_t *tower = malloc(sizeof(tower_t));

    if (!tower)
        return NULL;
    tower->pos = (sfVector2f){x, y};
    tower->radius = radius;
    init_tower_sprite(tower);
    init_tower_area(tower);
    return tower;
}

void destroy_tower(tower_t *tower)
{
    if (!tower)
        return;
    if (tower->sprite)
        sfSprite_destroy(tower->sprite);
    if (tower->area)
        sfCircleShape_destroy(tower->area);
    free(tower);
}

void draw_tower(tower_t *tower, sfRenderWindow *window,
    int show_sprites, int show_hitboxes)
{
    if (show_hitboxes && tower->area)
        sfRenderWindow_drawCircleShape(window, tower->area, NULL);
    if (show_sprites && tower->sprite)
        sfRenderWindow_drawSprite(window, tower->sprite, NULL);
}
