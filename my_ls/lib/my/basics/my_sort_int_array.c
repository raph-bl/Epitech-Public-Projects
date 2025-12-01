/*
** EPITECH PROJECT, 2024
** my_sort_int_array.c
** File description:
** Sorts an array of integers in ascending order
*/

void my_sort_int_array_conditions(int *array, int i, int j, int tmp)
{
    if (array[i] > array[j]) {
        tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}

void my_sort_int_array(int *array, int size)
{
    int i = 0;
    int j = 0;
    int tmp = 0;

    for (i = 0; i < size; i++) {
        for (j = i + 1; j < size; j++) {
            my_sort_int_array_conditions(array, i, j, tmp);
        }
    }
}
