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

//-> my_ls
int displag_lsg(int argc, char **argv);
int display_lsone(int argc, char **argv);
int display_lsm(int argc, char **argv);
int display_lsl(int argc, char **argv, bool show_hidden);
int display_t_flag(int argc, char **argv, bool show_hidden);
int display_s_flag(int argc, char **argv);
int display_i_flag(int argc, char **argv);
int display_d_flag(int argc, char **argv);
int display_dl_flag(int argc, char **argv);
// flags
int parser(int argc, char **argv);
int option_handler_1(char c, int argc, char **argv);
int print_dir(DIR *dir, bool show_hidden);
char *parse_options(int argc, char **argv);
char *parse_path(int argc, char **argv);
char *parse_path_bis(char *start, char *slash, char *end);
int manage_error(char *path);
int my_perror(char *str);
void display_total_block_usage(char *path, bool show_hidden);
char is_good(char *str, char c);
char *copy_and_concat(char *dest, char *src1, char *src2);
void parse_perms(struct stat *sb);
int end_of_str(char *end);
int end_of_str_bis(char *end);
int list_dir_info_lsl(char *path, bool show_hidden);
int my_conditionnal_forest_meudon(char *str,
    int argc, char **argv);
bool find_char(const char *str, char c);
// Types
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

// Scan
void find_width_loop(const char *format, int index,
    printf_args_t *struct_args, char *width);
int is_in_flags(printf_args_t *struct_args, char c);
void find_specifier(const char *format, int i, printf_args_t *struct_args);
void find_flag(const char *format, int i, printf_args_t *struct_args);
void find_width(const char *format, int i, printf_args_t *struct_args);
void find_precision(const char *format, int i, printf_args_t *struct_args);
void find_length_modifier(const char *format, int i,
    printf_args_t *struct_args);

// Basics
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
