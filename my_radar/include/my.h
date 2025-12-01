/*
** EPITECH PROJECT, 2024
** my.h
** File description:
** Header file for my library
*/

#ifndef MYLIB
    #define MYLIB
    #include <stdarg.h>
    #include <stdlib.h>
    #include <sys/types.h>
    #include <sys/stat.h>
    #include <libgen.h>
    #include <dirent.h>
    #include <stdbool.h>
    #include <SFML/Graphics/RenderWindow.h>
    #include <SFML/Graphics.h>
    #include <SFML/Window.h>
    #include <SFML/Audio.h>
    #include <stdio.h>
    #define ERROR_CODE 84
    #define M_PI 3.14159265358979323846
    #define WINDOW_WIDTH 1920
    #define WINDOW_HEIGHT 1080

typedef struct aircraft_s {
    sfSprite *sprite;
    sfRectangleShape *hitbox;
    sfVector2f pos;
    sfVector2f dest;
    float speed;
    int delay;
    int active;
} aircraft_t;

typedef struct tower_s {
    sfSprite *sprite;
    sfCircleShape *area;
    sfVector2f pos;
    float radius;
} tower_t;

typedef struct button_s {
    sfRectangleShape *shape;
    sfText *text;
    int is_hovered;
    int is_pressed;
} button_t;

typedef struct radar_s {
    sfRenderWindow *window;
    sfClock *clock;
    sfFont *font;
    sfText *timer_text;
    button_t *hitbox_button;
    button_t *sprite_button;
    aircraft_t **aircrafts;
    tower_t **towers;
    size_t aircraft_count;
    size_t tower_count;
    int show_sprites;
    int show_hitboxes;
} radar_t;

int my_sscanf(char *str, const char *format, ...);
aircraft_t *create_aircraft(sfVector2f pos, sfVector2f dest,
    float speed, int delay);
void destroy_aircraft(aircraft_t *aircraft);
void update_aircraft_position(aircraft_t *aircraft, float delta);
void draw_aircraft(aircraft_t *aircraft, sfRenderWindow *window,
    int show_sprites, int show_hitboxes);

tower_t *create_tower(float x, float y, float radius);
void destroy_tower(tower_t *tower);
void draw_tower(tower_t *tower, sfRenderWindow *window,
    int show_sprites, int show_hitboxes);

button_t *create_button(sfFont *font, char const *text, sfVector2f pos);
void destroy_button(button_t *button);
void update_button(button_t *button, sfVector2i mouse_pos);
int is_button_clicked(button_t *button, sfVector2i mouse_pos);
void draw_button(button_t *button, sfRenderWindow *window);

radar_t *create_radar(void);
void destroy_radar(radar_t *radar);
void destroy_mdr(radar_t *radar);
void handle_events(radar_t *radar);
void update_radar(radar_t *radar);
void draw_radar(radar_t *radar);

int parse_script(radar_t *radar, char const *filepath);
int load_script_file(radar_t *radar, char const *filepath, FILE **file);
/*********************************/
/*           My_Printf           */
/*********************************/
typedef struct printf_args_t {
    int params_len;
    int printed_chars_count;
    va_list args;
    char *flag;
    int width;
    int precision;
    char *length;
    char specifier;
} printf_args_t;

typedef struct my_printf {
    char specifier;
    int (*function)(printf_args_t *args);
} my_printf_t;
/*********************************/
/*           Printf Funcs        */
/*********************************/
/*
 * Put functions
 */
int va_my_put_unsigned_dec(printf_args_t *args);
int va_my_put_pointer(printf_args_t *args);
int va_my_put_octal(printf_args_t *args);
int va_my_put_hexa(printf_args_t *args);
int va_my_putchar(printf_args_t *args);
int va_my_put_int(printf_args_t *args);
int va_my_put_unsigned_int(printf_args_t *args);
int va_my_put_str(printf_args_t *args);
int va_my_put_float(printf_args_t *args);
int va_my_put_percentage(printf_args_t *args);
int va_my_put_scinote(printf_args_t *args);
int va_my_put_printed_chars_count(printf_args_t *args);
int va_my_put_a_specifier(printf_args_t *args);
int va_my_put_scinote_auto(printf_args_t *args);
/*
 * Scan functions
 */
void find_width_loop(const char *format, int index,
    printf_args_t *struct_args, char *width);
int is_in_flags(printf_args_t *struct_args, char c);
void find_specifier(const char *format, int i, printf_args_t *struct_args);
void find_flag(const char *format, int i, printf_args_t *struct_args);
void find_width(const char *format, int i, printf_args_t *struct_args);
void find_precision(const char *format, int i, printf_args_t *struct_args);
void find_length_modifier(const char *format, int i,
    printf_args_t *struct_args);
/*********************************/
/*           BASICS              */
/*********************************/
int my_itoa(int nb, char *str);
int my_atoi(const char *str);
void manage_min(void);
int my_put_nbr(int nb);
int my_printf(const char *format, ...);
char *my_strchr(char *source, int c);
int my_base_len(long long int nbr, int base_len);
int my_put_unsigned_int_base(unsigned int nbr, char const *base);
int my_char_isnum(char c);
int my_put_double_base(double f, char const *base);
int my_put_unsigned_int(unsigned int nb);
int my_put_long_long_int_base(long long int nbr, char const *base);
int my_put_int_base(int nbr, char const *base);
int my_floatlen(double f);
void my_put_float(double f);
int my_nbrlen(int nb);
void my_putchar(char c);
int my_isneg(int nb);
int my_put_int(int nb);
void my_swap(int *a, int *b);
int my_putstr(char const *str);
int my_strlen(char const *str);
int my_getnbr(char const *str);
void my_sort_int_array(int *tab, int size);
void my_sort_int_array_conditions(int *array, int i, int j, int tmp);
int my_compute_power_rec(int nb, int power);
int my_compute_square_root(int nb);
int my_is_prime(int nb);
int my_find_prime_sup(int nb);
char *my_strcpy(char *dest, char const *src);
char *my_strncpy(char *dest, char const *src, int n);
char *my_revstr(char *str);
void my_reverse_str_goat(char *str, int len);
char *my_strstr(char *str, char const *to_find);
int my_strstr2(char *str, char const *to_find, int len, int i);
int my_strstr3(char *str, char const *to_find, int len, int i);
int my_strcmp(char const *s1, char const *s2);
int my_strncmp(char const *s1, char const *s2, int n);
char *my_strupcase(char *str);
char *my_strlowcase(char *str);
int my_str_isalpha(char const *str);
int my_str_isnum(char const *str);
int my_str_islower(char const *str);
int my_str_isupper(char const *str);
int my_str_isprintable(char const *str);
int my_showstr(char const *str);
int my_showmem(char const *str, int size);
char *my_strcat(char *dest, char const *src);
char *my_strncat(char *dest, char const *src, int nb);
char *my_strdup(char const *src);
char *concat_params(int argc, char **argv);
char **my_str_to_word_array(char const *str);
void end_arr(char **arr, int j, int k);
int my_is_alphanum(char c);
int my_show_word_array(char *const *tab);
int my_compute_factorial_rec(int nb);
char *my_evil_str(char *str);
int my_sqrt(int n, int x);
int check_sign(char const *str, int *i);
int my_print_alpha(void);
int my_print_comb2(void);
int my_print_comb2_conditions(int a, int b, int c, int d);
int my_print_comb2_loops(int a, int b);
int my_print_comb(void);
int my_print_comb_second_loop(int a);
int my_print_comb_third_loop(int a, int b);
int my_print_digits(void);
int my_print_revalpha(void);

#endif
