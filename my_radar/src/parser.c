/*
** EPITECH PROJECT, 2025
** my_radar
** File description:
** Script parsing functions implementation
*/

#include "my.h"
#include <stdio.h>
#include <stdlib.h>

static int validate_entity_line(char *line)
{
    if (line[0] != 'A' && line[0] != 'T')
        return ERROR_CODE;
    return 0;
}

static int count_entities_per_type(char *line, size_t *aircraft_count,
    size_t *tower_count)
{
    if (line[0] == 'A')
        (*aircraft_count)++;
    if (line[0] == 'T')
        (*tower_count)++;
    return 0;
}

static int count_entities(FILE *file, size_t *ac_count, size_t *tw_count)
{
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    *ac_count = 0;
    *tw_count = 0;
    for (read = getline(&line, &len, file); read != -1;
        read = getline(&line, &len, file)) {
        if (read <= 0 || line[0] == '\n' || line[0] == '#')
            continue;
        if (validate_entity_line(line) != 0) {
            free(line);
            return ERROR_CODE;
        }
        count_entities_per_type(line, ac_count, tw_count);
    }
    free(line);
    return 0;
}

static int parse_aircraft(char *line, radar_t *radar, size_t *index)
{
    float pos_x;
    float pos_y;
    float dest_x;
    float dest_y;
    float speed;
    int delay;

    if (my_sscanf(line, "A %f %f %f %f %f %d",
        &pos_x, &pos_y, &dest_x, &dest_y, &speed, &delay) != 6)
        return ERROR_CODE;
    radar->aircrafts[*index] = create_aircraft((sfVector2f){pos_x, pos_y},
        (sfVector2f){dest_x, dest_y}, speed, delay);
    if (!radar->aircrafts[*index])
        return ERROR_CODE;
    (*index)++;
    return 0;
}

static int parse_tower(char *line, radar_t *radar, size_t *index)
{
    float pos_x;
    float pos_y;
    float radius;

    if (my_sscanf(line, "T %f %f %f", &pos_x, &pos_y, &radius) != 3)
        return ERROR_CODE;
    radar->towers[*index] = create_tower(pos_x, pos_y, radius);
    if (!radar->towers[*index])
        return ERROR_CODE;
    (*index)++;
    return 0;
}

static int allocate_entities(radar_t *radar, size_t aircraft_count,
    size_t tower_count)
{
    radar->aircraft_count = aircraft_count;
    radar->tower_count = tower_count;
    radar->aircrafts = malloc(sizeof(aircraft_t *) * aircraft_count);
    radar->towers = malloc(sizeof(tower_t *) * tower_count);
    if (!radar->aircrafts || !radar->towers)
        return ERROR_CODE;
    return 0;
}

static int handle_entity_line(char *line, radar_t *radar,
    size_t *ac_idx, size_t *tw_idx)
{
    if (line[0] == 'A' && parse_aircraft(line, radar, ac_idx) != 0)
        return ERROR_CODE;
    if (line[0] == 'T' && parse_tower(line, radar, tw_idx) != 0)
        return ERROR_CODE;
    return 0;
}

int load_script_file(radar_t *radar, char const *filepath, FILE **file)
{
    *file = fopen(filepath, "r");
    if (!(*file))
        return ERROR_CODE;
    if (count_entities(*file, &radar->aircraft_count, &radar->tower_count) != 0
        || allocate_entities(radar, radar->aircraft_count,
        radar->tower_count) != 0) {
        fclose(*file);
        return ERROR_CODE;
    }
    fclose(*file);
    *file = fopen(filepath, "r");
    if (!(*file))
        return ERROR_CODE;
    return 0;
}

int parse_script(radar_t *radar, char const *filepath)
{
    FILE *file;
    char *line = NULL;
    size_t len = 0;
    size_t ac_idx = 0;
    size_t tw_idx = 0;
    ssize_t read;

    if (load_script_file(radar, filepath, &file) != 0)
        return ERROR_CODE;
    for (read = getline(&line, &len, file); read != -1;
        read = getline(&line, &len, file)) {
        if (read <= 0 || line[0] == '\n' || line[0] == '#')
            continue;
        if (handle_entity_line(line, radar, &ac_idx, &tw_idx) != 0)
            return ERROR_CODE;
    }
    free(line);
    fclose(file);
    return 0;
}
