/*
** EPITECH PROJECT, 2024
** test_my_printf.c
** File description:
** Showing a sample
*/

#include <criterion/criterion.h>
#include <criterion/redirect.h>
#include "my_printf.h"
#include <limits.h>
#include <float.h>

int my_printf(const char *format, ...);

void redirect_all_std(void)
{
    cr_redirect_stdout();
    cr_redirect_stderr();
}

Test(my_printf, base_tests_standard, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("Hello, World!\n"), 14);
    cr_assert_stdout_eq_str("Hello, World!\n");
}

Test(my_printf, base_tests_decimal, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%d\n", 42), 3);
    cr_assert_stdout_eq_str("42\n");
}

Test(my_printf, base_tests_decimal2, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%i\n", 42), 3);
    cr_assert_stdout_eq_str("42\n");
}

Test(my_printf, base_tests_string, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%s\n", "Hello, World!"), 14);
    cr_assert_stdout_eq_str("Hello, World!\n");
}

Test(my_printf, base_tests_float, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%f\n", 3.14), 9);
    cr_assert_stdout_eq_str("3.140000\n");
}

Test(my_printf, base_tests_float2, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%F\n", 3.14), 9);
    cr_assert_stdout_eq_str("3.140000\n");
}

Test(my_printf, base_tests_percentage, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%%\n"), 2);
    cr_assert_stdout_eq_str("%\n");
}

Test(my_printf, base_tests_unsigned, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%u\n", 42), 3);
    cr_assert_stdout_eq_str("42\n");
}

Test(my_printf, base_tests_octal, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%o\n", 255), 4);
    cr_assert_stdout_eq_str("377\n");
}

Test(my_printf, base_tests_pointer, .init = redirect_all_std)
{
    int a = 10;
    cr_assert_eq(my_printf("%p\n", &a), 15);
}

Test(my_printf, base_tests_hex, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%x\n", 255), 3);
    cr_assert_stdout_eq_str("ff\n");
}

Test(my_printf, base_tests_hex2, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%X\n", 255), 3);
    cr_assert_stdout_eq_str("FF\n");
}

Test(my_printf, base_tests_scientific, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%e\n", 3.14159), 13);
    cr_assert_stdout_eq_str("3.141590e+00\n");
}

Test(my_printf, base_tests_scientific2, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%E\n", 3.14159), 13);
    cr_assert_stdout_eq_str("3.141590E+00\n");
}

Test(my_printf, base_tests_n, .init = redirect_all_std)
{
    int a = 0;
    cr_assert_eq(my_printf("This is a test%n\n", &a), 15);
    cr_assert_eq(a, 14);
    cr_assert_stdout_eq_str("This is a test\n");
}

Test(my_printf, base_tests_g, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%g\n", 3.14), 5);
    cr_assert_stdout_eq_str("3.14\n");
}

Test(my_printf, base_tests_g2, .init = redirect_all_std)
{
    cr_assert_eq(my_printf("%g\n", 2.223421), 8);
    cr_assert_stdout_eq_str("2.22342\n");
}

Test(my_printf, test_char, .init = redirect_all_std)
{
    int result = my_printf("Char: %c\n", 'a');
    cr_assert_eq(result, 8);
    cr_assert_stdout_eq_str("Char: a\n");
}

Test(my_printf, test_string, .init = redirect_all_std)
{
    int result = my_printf("String: %s\n", "Hello World!");
    cr_assert_eq(result, 21);
    cr_assert_stdout_eq_str("String: Hello World!\n");
}

Test(my_printf, test_integer_d, .init = redirect_all_std)
{
    int result = my_printf("Integer (d): %d\n", 21);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Integer (d): 21\n");
}

Test(my_printf, test_integer_i, .init = redirect_all_std)
{
    int result = my_printf("Integer (i): %i\n", 42);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Integer (i): 42\n");
}

Test(my_printf, test_float_lowercase, .init = redirect_all_std)
{
    int result = my_printf("Float: %f\n", 3.14);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Float: 3.140000\n");
}

Test(my_printf, test_float_uppercase, .init = redirect_all_std)
{
    int result = my_printf("Float: %F\n", 3.14);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Float: 3.140000\n");
}

Test(my_printf, test_unsigned, .init = redirect_all_std)
{
    unsigned int a = 4294967290;
    int result = my_printf("Unsigned: %u\n", a);
    cr_assert_eq(result, 21);
    cr_assert_stdout_eq_str("Unsigned: 4294967290\n");
}

Test(my_printf, test_octal, .init = redirect_all_std)
{
    int result = my_printf("Octal: %o\n", 255);
    cr_assert_eq(result, 11);
    cr_assert_stdout_eq_str("Octal: 377\n");
}

Test(my_printf, test_hex_lower, .init = redirect_all_std)
{
    int result = my_printf("Hex (lower): %x\n", 255);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Hex (lower): ff\n");
}

Test(my_printf, test_hex_upper, .init = redirect_all_std)
{
    int result = my_printf("Hex (upper): %X\n", 255);
    cr_assert_eq(result, 16);
    cr_assert_stdout_eq_str("Hex (upper): FF\n");
}

Test(my_printf, test_pointer, .init = redirect_all_std)
{
    int a = 10;
    int result = my_printf("Pointer: %p\n", &a);
    cr_assert_eq(result, 24);
}

Test(my_printf, test_percentage, .init = redirect_all_std)
{
    int result = my_printf("Percentage: %%\n");
    cr_assert_eq(result, 14);
    cr_assert_stdout_eq_str("Percentage: %\n");
}

Test(my_printf, test_scientific_lower, .init = redirect_all_std)
{
    int result = my_printf("Scientific (lower): %e\n", 3.14159);
    cr_assert_eq(result, 33);
    cr_assert_stdout_eq_str("Scientific (lower): 3.141590e+00\n");
}

Test(my_printf, test_scientific_upper, .init = redirect_all_std)
{
    int result = my_printf("Scientific (upper): %E\n", 3.14159);
    cr_assert_eq(result, 33);
    cr_assert_stdout_eq_str("Scientific (upper): 3.141590E+00\n");
}

Test(my_printf, n_specifier, .init = redirect_all_std)
{
    int a = 0;
    int result = my_printf("This is a test%n\n", &a);
    cr_assert_eq(result, 15);
    cr_assert_eq(a, 14);
    cr_assert_stdout_eq_str("This is a test\n");
}

Test(my_printf, g_specifier1, .init = redirect_all_std)
{
    double a = 3.14;
    int result = my_printf("G: %g\n", a);
    cr_assert_eq(result, 8);
    cr_assert_stdout_eq_str("G: 3.14\n");
}

Test(my_printf, g_specifier2, .init = redirect_all_std)
{
    double a = 2.223421;
    int result = my_printf("G: %g\n", a);
    cr_assert_eq(result, 11);
    cr_assert_stdout_eq_str("G: 2.22342\n");
}

Test(my_printf, G_specifier1, .init = redirect_all_std)
{
    double a = 3.14;
    int result = my_printf("G: %G\n", a);
    cr_assert_eq(result, 8);
    cr_assert_stdout_eq_str("G: 3.14\n");
}

Test(my_printf, G_specifier2, .init = redirect_all_std)
{
    double a = 2.223421;
    int result = my_printf("G: %G\n", a);
    cr_assert_eq(result, 11);
    cr_assert_stdout_eq_str("G: 2.22342\n");
}

Test(my_printf, print_simple_string, .init = redirect_all_std)
{
    int result = my_printf("Hello, World!\n");
    cr_assert_eq(result, 14);
    cr_assert_stdout_eq_str("Hello, World!\n");
}

Test(my_printf, multiple_args, .init = redirect_all_std)
{
    int result = my_printf("%d %s %c\n", 42, "test", 'x');
    cr_assert_stdout_eq_str("42 test x\n");
    cr_assert_eq(result, 10);
}

Test(my_printf, int_min, .init = redirect_all_std)
{
    int result = my_printf("%d\n", INT_MIN);
    cr_assert_stdout_eq_str("-2147483648\n");
    cr_assert_eq(result, 12);
}

Test(my_printf, int_max, .init = redirect_all_std)
{
    int result = my_printf("%d\n", INT_MAX);
    cr_assert_stdout_eq_str("2147483647\n");
    cr_assert_eq(result, 11);
}

Test(my_printf, float_precision, .init = redirect_all_std)
{
    int result = my_printf("%.2f\n", 3.14159);
    cr_assert_stdout_eq_str("3.14\n");
    cr_assert_eq(result, 5);
}

Test(my_printf, float_large_precision, .init = redirect_all_std)
{
    int result = my_printf("%.10f\n", 3.14159);
    cr_assert_stdout_eq_str("3.1415900000\n");
    cr_assert_eq(result, 13);
}

Test(my_printf, padding_right, .init = redirect_all_std)
{
    int result = my_printf("%10d\n", 42);
    cr_assert_stdout_eq_str("        42\n");
    cr_assert_eq(result, 11);
}

Test(my_printf, padding_left, .init = redirect_all_std)
{
    int result = my_printf("%-10dYES\n", 42);
    cr_assert_stdout_eq_str("42        YES\n");
    cr_assert_eq(result, 14);
}

Test(my_printf, zero_padding, .init = redirect_all_std)
{
    int result = my_printf("%010d\n", 42);
    cr_assert_stdout_eq_str("0000000042\n");
    cr_assert_eq(result, 11);
}

Test(my_printf, special_chars, .init = redirect_all_std)
{
    int result = my_printf("%c%c%c\n", '\n', '\t', '\r');
    cr_assert_stdout_eq_str("\n\t\r\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, empty_string, .init = redirect_all_std)
{
    int result = my_printf("%s\n", "");
    cr_assert_stdout_eq_str("\n");
    cr_assert_eq(result, 1);
}

Test(my_printf, null_string, .init = redirect_all_std)
{
    int result = my_printf("%s\n", NULL);
    cr_assert_stdout_eq_str("(null)\n");
    cr_assert_eq(result, 7);
}

Test(my_printf, combined_flags, .init = redirect_all_std)
{
    int result = my_printf("%+010d\n", 42);
    cr_assert_stdout_eq_str("+000000042\n");
    cr_assert_eq(result, 11);
}

Test(my_printf, string_precision, .init = redirect_all_std)
{
    int result = my_printf("%.3s\n", "Hello");
    cr_assert_stdout_eq_str("Hel\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, hex_zero, .init = redirect_all_std)
{
    int result = my_printf("%x\n", 0);
    cr_assert_stdout_eq_str("0\n");
    cr_assert_eq(result, 2);
}

Test(my_printf, hex_max, .init = redirect_all_std)
{
    int result = my_printf("%x\n", UINT_MAX);
    cr_assert_stdout_eq_str("ffffffff\n");
    cr_assert_eq(result, 9);
}

Test(my_printf, octal_zero, .init = redirect_all_std)
{
    int result = my_printf("%o\n", 0);
    cr_assert_stdout_eq_str("0\n");
    cr_assert_eq(result, 2);
}

Test(my_printf, octal_max, .init = redirect_all_std)
{
    int result = my_printf("%o\n", UINT_MAX);
    cr_assert_stdout_eq_str("37777777777\n");
    cr_assert_eq(result, 12);
}

Test(my_printf, hash_hex, .init = redirect_all_std)
{
    int result = my_printf("%#x\n", 255);
    cr_assert_stdout_eq_str("0xff\n");
    cr_assert_eq(result, 5);
}

Test(my_printf, hash_oct, .init = redirect_all_std)
{
    int result = my_printf("%#o\n", 255);
    cr_assert_stdout_eq_str("0377\n");
    cr_assert_eq(result, 5);
}

Test(my_printf, scientific_zero, .init = redirect_all_std)
{
    int result = my_printf("%e\n", 0.0);
    cr_assert_stdout_eq_str("0.000000e+00\n");
    cr_assert_eq(result, 13);
}

Test(my_printf, scientific_large, .init = redirect_all_std)
{
    int result = my_printf("%e\n", 1234567.89);
    cr_assert_stdout_eq_str("1.234568e+06\n");
    cr_assert_eq(result, 13);
}

Test(my_printf, multi_base, .init = redirect_all_std)
{
    int n = 255;
    int result = my_printf("dec:%d hex:%x oct:%o\n", n, n, n);
    cr_assert_stdout_eq_str("dec:255 hex:ff oct:377\n");
    cr_assert_eq(result, 23);
}

Test(my_printf, null_pointer, .init = redirect_all_std)
{
    int result = my_printf("%p\n", NULL);
    cr_assert_stdout_eq_str("(nil)\n");
    cr_assert_eq(result, 6);
}

Test(my_printf, sign_positive, .init = redirect_all_std)
{
    int result = my_printf("%+d\n", 42);
    cr_assert_stdout_eq_str("+42\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, sign_negative, .init = redirect_all_std)
{
    int result = my_printf("%+d\n", -42);
    cr_assert_stdout_eq_str("-42\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, zero_precision_float, .init = redirect_all_std)
{
    int result = my_printf("%.0f\n", 3.14159);
    cr_assert_stdout_eq_str("3\n");
    cr_assert_eq(result, 2);
}

Test(my_printf, large_number, .init = redirect_all_std)
{
    int result = my_printf("%f\n", 123456789.123456);
    cr_assert_stdout_eq_str("123456789.123456\n");
    cr_assert_eq(result, 17);
}

Test(my_printf, small_number, .init = redirect_all_std)
{
    int result = my_printf("%f\n", 0.000000123);
    cr_assert_stdout_eq_str("0.000000\n");
    cr_assert_eq(result, 9);
}

Test(my_printf, space_flag, .init = redirect_all_std)
{
    int result = my_printf("% d\n", 42);
    cr_assert_stdout_eq_str(" 42\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, space_flag_negative, .init = redirect_all_std)
{
    int result = my_printf("% d\n", -42);
    cr_assert_stdout_eq_str("-42\n");
    cr_assert_eq(result, 4);
}

Test(my_printf, variable_width, .init = redirect_all_std)
{
    int result = my_printf("Y%*dY\n", 5, 42);
    cr_assert_stdout_eq_str("Y   42Y\n");
    cr_assert_eq(result, 8);
}

Test(my_printf, non_printable, .init = redirect_all_std)
{
    int result = my_printf("%c%c%c\n", 7, 27, 127);
    cr_assert_eq(result, 4);
}

// Test(my_printf, length_modifiers, .init = redirect_all_std)
// {
//     long l = LONG_MAX;
//     short s = SHRT_MAX;
//     int result = my_printf("%ld %hd\n", l, s);
//     cr_assert_stdout_eq_str("9223372036854775807 32767\n");
//     cr_assert_eq(result, 26);
// }

Test(my_printf, complex_format, .init = redirect_all_std)
{
    int result = my_printf("%+#010x %-.8s %3c\n", 255, "test", 'A');
    cr_assert_stdout_eq_str("0x000000ff test   A\n");
    cr_assert_eq(result, 20);
}

Test(my_printf, unicode_char, .init = redirect_all_std)
{
    int result = my_printf("%c\n", 233);
    cr_assert_eq(result, 2);
}

Test(my_printf, multiple_flags, .init = redirect_all_std)
{
    int result = my_printf("%+ #010x\n", 255);
    cr_assert_stdout_eq_str("0x000000ff\n");
    cr_assert_eq(result, 11);
}

Test(my_printf, invalid_format, .init = redirect_all_std)
{
    int result = my_printf("%");
    cr_assert_eq(result, -1);
}

Test(my_printf, invalid_specifier, .init = redirect_all_std)
{
    int result = my_printf("%z\n");
    cr_assert_eq(result, 2);
    cr_assert_stdout_eq_str("%\n");
}

Test(my_printf, long_string, .init = redirect_all_std)
{
    char long_str[1001];
    memset(long_str, 'a', 1000);
    long_str[1000] = '\0';
    int result = my_printf("%s\n", long_str);
    cr_assert_eq(result, 1001);
}

Test(my_printf, mixed_format, .init = redirect_all_std)
{
    int result = my_printf("Hex:%#x Dec:%+d Oct:%#o Char:%c String:%s Float:%f\n",
        255, 255, 255, 'A', "test", 255.0);
    cr_assert_stdout_eq_str("Hex:0xff Dec:+255 Oct:0377 Char:A String:test Float:255.000000\n");
    cr_assert_eq(result, 63);
}






Test(concat_params, test_concat_params)
{
    char *argv[] = {"Hello", "World", "!", NULL};
    char *result = concat_params(3, argv);
    cr_assert_str_eq(result, "Hello\nWorld\n!");
    free(result);
}

Test(my_compute_factorial_rec, test_my_compute_factorial_rec)
{
    cr_assert_eq(my_compute_factorial_rec(5), 120);
    cr_assert_eq(my_compute_factorial_rec(0), 1);
    cr_assert_eq(my_compute_factorial_rec(1), 1);
    cr_assert_eq(my_compute_factorial_rec(10), 3628800);
    cr_assert_eq(my_compute_factorial_rec(-1), 0);
    cr_assert_eq(my_compute_factorial_rec(13), 0);
}

Test(my_compute_power_rec, test_my_compute_power_rec)
{
    cr_assert_eq(my_compute_power_rec(5, 3), 125);
    cr_assert_eq(my_compute_power_rec(0, 0), 1);
    cr_assert_eq(my_compute_power_rec(2, 0), 1);
    cr_assert_eq(my_compute_power_rec(2, 1), 2);
    cr_assert_eq(my_compute_power_rec(2, 10), 1024);
    cr_assert_eq(my_compute_power_rec(2, -1), 0);
}

Test(my_compute_square_root, test_my_compute_square_root)
{
    cr_assert_eq(my_compute_square_root(4), 2);
    cr_assert_eq(my_compute_square_root(0), 0);
    cr_assert_eq(my_compute_square_root(1), 1);
    cr_assert_eq(my_compute_square_root(9), 3);
    cr_assert_eq(my_compute_square_root(16), 4);
    cr_assert_eq(my_compute_square_root(25), 5);
    cr_assert_eq(my_compute_square_root(26), 0);
}

Test(my_evil_str, test_my_evil_str)
{
    char str[] = "Hello, World!";
    my_evil_str(str);
}

Test(my_find_prime_sup, test_my_find_prime_sup)
{
    cr_assert_eq(my_find_prime_sup(5), 5);
    cr_assert_eq(my_find_prime_sup(0), 2);
    cr_assert_eq(my_find_prime_sup(1), 2);
    cr_assert_eq(my_find_prime_sup(10), 11);
    cr_assert_eq(my_find_prime_sup(13), 13);
}

Test(my_floatlen, test_my_floatlen)
{
    my_floatlen(3.14);
    my_floatlen(-3.14);
}

Test(my_getnbr, test_my_getnbr)
{
    my_getnbr("42");
    my_getnbr("-42");
    my_getnbr("0");
    my_getnbr("aaa");
    my_getnbr("21474836472323");
    my_getnbr("");
    my_getnbr("+232");
    my_getnbr("/");
}

Test(my_is_prime, test_my_is_prime)
{
    cr_assert_eq(my_is_prime(5), 1);
    cr_assert_eq(my_is_prime(0), 0);
    cr_assert_eq(my_is_prime(1), 0);
    cr_assert_eq(my_is_prime(10), 0);
    cr_assert_eq(my_is_prime(13), 1);
}

Test(my_isneg, test_my_isneg, .init = redirect_all_std)
{
    my_isneg(42);
    my_isneg(-42);
    my_isneg(0);
}

Test(my_print_alpha, test_my_print_alpha, .init = redirect_all_std)
{
    my_print_alpha();
}

Test(my_print_comb, test_my_print_comb, .init = redirect_all_std)
{
    my_print_comb();
}

Test(my_print_comb2, test_my_print_comb2, .init = redirect_all_std)
{
    my_print_comb2();
}

Test(my_print_digits, test_my_print_digits, .init = redirect_all_std)
{
    my_print_digits();
}

Test(my_print_revalpha, test_my_print_revalpha, .init = redirect_all_std)
{
    my_print_revalpha();
}

Test(my_put_int, test_my_put_int, .init = redirect_all_std)
{
    my_put_int(42);
    my_put_int(-42);
    my_put_int(0);
}

Test(my_put_int_base, test_my_put_int_base, .init = redirect_all_std)
{
    my_put_int_base(42, "0123456789");
    my_put_int_base(42, "01");
    my_put_int_base(42, "0123456789ABCDEF");
    my_put_int_base(42, "0123456789abcdef");
    my_put_int_base(42, "1");
    my_put_int_base(-42, "0123456789abcdef");
}

Test(my_put_long_long_int_base, test_my_put_long_long_int_base, .init = redirect_all_std)
{
    my_put_long_long_int_base(42, "0123456789");
    my_put_long_long_int_base(42, "01");
    my_put_long_long_int_base(42, "0123456789ABCDEF");
    my_put_long_long_int_base(42, "0123456789abcdef");
    my_put_long_long_int_base(-42, "0123456789abcdef");
}

Test(my_put_unsigned_int, test_my_put_unsigned_int, .init = redirect_all_std)
{
    my_put_unsigned_int(42);
    my_put_unsigned_int(0);
}

Test(my_put_unsigned_int_base, test_my_put_unsigned_int_base, .init = redirect_all_std)
{
    my_put_unsigned_int_base(42, "0123456789");
    my_put_unsigned_int_base(42, "1");
    my_put_unsigned_int_base(42, "0123456789ABCDEF");
    my_put_unsigned_int_base(42, "0123456789abcdef");
}

Test(my_show_word_array, test_my_show_word_array, .init = redirect_all_std)
{
    char *arr[] = {"Hello", "World", "!", NULL};
    my_show_word_array(arr);
}

Test(my_sort_int_array, test_my_sort_int_array)
{
    int arr[] = {3, 2, 1};
    my_sort_int_array(arr, 3);
    int arr2[] = {1, 2, 3};
    my_sort_int_array(arr2, 3);
}

Test(my_str_isalpha, test_my_str_isalpha)
{
    cr_assert_eq(my_str_isalpha("Hello"), 1);
    cr_assert_eq(my_str_isalpha("Hello!"), 0);
    cr_assert_eq(my_str_isalpha("Hello123"), 0);
    cr_assert_eq(my_str_isalpha("123"), 0);
    cr_assert_eq(my_str_isalpha(""), 0);
    cr_assert_eq(my_str_isalpha("},;"), 0);
}

Test(my_str_islower, test_my_str_islower)
{
    cr_assert_eq(my_str_islower("hello"), 1);
    cr_assert_eq(my_str_islower("Hello"), 0);
    cr_assert_eq(my_str_islower("Hello!"), 0);
    cr_assert_eq(my_str_islower("Hello123"), 0);
    cr_assert_eq(my_str_islower("123"), 0);
    cr_assert_eq(my_str_islower("},;"), 0);
    cr_assert_eq(my_str_islower("AAAAAA"), 0);
}

Test(my_str_isnum, test_my_str_isnum)
{
    cr_assert_eq(my_str_isnum("123"), 1);
    cr_assert_eq(my_str_isnum("Hello"), 0);
    cr_assert_eq(my_str_isnum("Hello!"), 0);
    cr_assert_eq(my_str_isnum("Hello123"), 0);
    cr_assert_eq(my_str_isnum(""), 0);
    cr_assert_eq(my_str_isnum("},;"), 0);
    cr_assert_eq(my_str_isnum("2323H"), 0);
    cr_assert_eq(my_str_isnum("/"), 0);
}

Test(my_str_isprintable, test_my_str_isprintable)
{
    cr_assert_eq(my_str_isprintable("Hello"), 1);
    cr_assert_eq(my_str_isprintable("Hello\n"), 0);
    cr_assert_eq(my_str_isprintable("Hello\t"), 0);
    cr_assert_eq(my_str_isprintable("Hello\0"), 1);
    cr_assert_eq(my_str_isprintable("Hello\177"), 0);
    cr_assert_eq(my_str_isprintable(""), 1);
    cr_assert_eq(my_str_isprintable("\177"), 0);
}

Test(my_str_isupper, test_my_str_isupper)
{
    cr_assert_eq(my_str_isupper("HELLO"), 1);
    cr_assert_eq(my_str_isupper("Hello"), 0);
    cr_assert_eq(my_str_isupper("Hello!"), 0);
    cr_assert_eq(my_str_isupper("Hello123"), 0);
    cr_assert_eq(my_str_isupper("123"), 0);
    cr_assert_eq(my_str_isupper("},;"), 0);
    cr_assert_eq(my_str_isupper("/"), 0);
    cr_assert_eq(my_str_isupper("aaaaaa"), 0);
    cr_assert_eq(my_str_isupper(""), 0);
}

Test(my_str_to_word_array, test_my_str_to_word_array)
{
    char **result = my_str_to_word_array("Hello World");
    cr_assert_str_eq(result[0], "Hello");
    cr_assert_str_eq(result[1], "World");
    cr_assert_null(result[2]);
    free(result);
    my_str_to_word_array("");
    my_str_to_word_array("/ Hello World { : 5");
}

Test(my_strcmp, test_my_strcmp)
{
    cr_assert_eq(my_strcmp("Hello", "Hello"), 0);
    cr_assert_eq(my_strcmp("Hello", "Hello!"), -33);
    cr_assert_eq(my_strcmp("Hello!", "Hello"), 33);
    cr_assert_eq(my_strcmp("Hello", "World"), -15);
    cr_assert_eq(my_strcmp("World", "Hello"), 15);
    cr_assert_eq(my_strcmp("", ""), 0);
}

Test(my_strlowcase, test_my_strlowcase)
{
    char str[] = "Hello, World!";
    my_strlowcase(str);
}

Test(my_strncat, test_my_strncat)
{
    char dest[100] = "Hello, ";
    my_strncat(dest, "World!", 100);

    char dest2[100] = "";
    my_strncat(dest2, "", -1);
    my_strncat(dest2, "", 0);
}

Test(my_strncmp, test_my_strncmp)
{
    my_strncmp("Hello", "Hello", 5);
    my_strncmp("Hello", "Hello!", 0);
    my_strncmp("Hello!", "Hello", -1);
    my_strncmp("", "", 0);
    my_strncmp("Aello", "Hello", 5);
}

Test(my_strncpy, test_my_strncpy)
{
    char dest[100] = "";
    my_strncpy(dest, "Hello, World!", 100);
}

Test(my_strstr, test_my_strstr)
{
    my_strstr("Hello, World!", "World");
    my_strstr("Hello, World!", "World!");
    my_strstr("Hello, World!", "Hello");
    my_strstr("Hello, World!", "Hello,");
    my_strstr("Hello, World!", "Hello, ");
    my_strstr("Hello, World!", "Hello, World!");
    my_strstr("Hello, World!", "Hello, World!)");
    my_strstr("Hello, World!", "Hello, World! ");
    my_strstr("", "");
}

Test(my_strupcase, test_my_strupcase)
{
    char str[] = "Hello, }World!/";
    my_strupcase(str);
    my_strupcase("");
}

Test(my_printf, length_modifiers_tests, .init = redirect_all_std)
{
    long l = LONG_MAX;
    short s = SHRT_MAX;
    my_printf("%ld %hd\n", l, s);

    long long ll = LLONG_MAX;
    my_printf("%lld\n", ll);

    my_printf("%hhd %hhu\n", s, s);
}

Test(find_precision, test_find_precision)
{
    printf_args_t args;
    args.precision = 1;
    args.params_len = 3;
    find_precision("%.5f\n", 0, &args);

    printf_args_t args2;
    args2.precision = -1;
    args2.params_len = 2;
    find_precision("%.5f\n", 0, &args2);
}

Test(find_width, test_find_width)
{
    printf_args_t args;
    args.width = 1;
    args.params_len = 3;
    find_width("%*f\n", 0, &args);
}

Test(find_width_loop, test_find_width_loop)
{
    printf_args_t args;
    args.width = 1;
    args.params_len = 0;
    char width[10];
    find_width_loop("%*f\n", 0, &args, width);
}

Test(my_printf, va_myputint, .init = redirect_all_std)
{
    my_printf("%.0d\n", 42);
    my_printf("%.10d\n", 42);
    my_printf("%01d\n", 4200);
    my_printf("%#o\n", 0);
    my_printf("%1p\n", 2323232);
    my_printf("%20p\n", 2323232);
    my_printf("%-20p\n", 2323232);
    my_printf("%-p\n", 2323232);
}

Test(my_base_len, test_my_base_len)
{
    my_base_len(42, 10);
    my_base_len(0, 10);
}

Test(my_printf, scient, .init = redirect_all_std)
{
    my_printf("%e\n", 222222222222.232);
    my_printf("%e\n", -3.1);
    my_printf("%E\n", 0.14);
}

Test(my_printf, scientauto, .init = redirect_all_std)
{
    my_printf("%+g\n", 2.232);
    my_printf("%+g\n", -2.232);
    my_printf("% g\n", 2.2);
    my_printf("% g\n", -2.2);
    my_printf("%+g\n", -2.2);
    my_printf("%12g\n", 2.2);
    my_printf("%0g\n", 2.2);
    my_printf("%010g\n", 2.2);
    my_printf("%-g\n", 2.2);
    my_printf("%-10g\n", 2.2);
}

Test(my_printf, float, .init = redirect_all_std)
{
    my_printf("%-0s\n", "Hello, World!");
    my_printf("%-s\n", "Hello, World!");
    my_printf("%0s\n", "Hello, World!");
    my_printf("%10s\n", "Hello, World!");
    my_printf("%10s\n", "Hello");
}

Test(my_printf, va_my_putchar_tests, .init = redirect_all_std)
{
    my_printf("%10c\n", 'a');
    my_printf("%-010c\n", 'a');
    my_printf("%-0c\n", 'a');
    my_printf("%-10c\n", 'a');
    my_printf("%010c\n", 'a');
}

Test(my_printf, va_my_putfloat_tests, .init = redirect_all_std)
{
    my_printf("%f\n", 99.99999999999999);
}