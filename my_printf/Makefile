##
## EPITECH PROJECT, 2024
## Makefile
## File description:
## Makefile
##

MAKEFLAGS += -B -s

CFLAGS = -W -Wall -Wextra -I./include
TFLAGS = -lcriterion --coverage

SRC = $(shell find ./src -name "*.c")
TESTS = $(shell find ./tests -name "*.c")
OBJ = $(SRC:.c=.o)

NAME = lib/libmy_printf.a

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) -c $(SRC) $(CFLAGS)
	ar -rc $(NAME) $(OBJ)

clean:
	find -name "*.gc*" -delete
	find -name "*.o" -delete

fclean: clean
	$(RM) $(NAME)

re: fclean all

tests_run: all
	-@$(CC) $(SRC) $(TESTS) $(CFLAGS) $(TFLAGS)
	-@./a.out

tests: tests_run
	$(MAKE) clean
	$(RM) a.out

coverage: tests_run
	gcovr --exclude tests/
	gcovr --exclude tests/ --txt-metric branch
	$(MAKE) clean
	$(RM) a.out

debug:
	-@$(CC) $(SRC) $(TESTS) $(CFLAGS) $(TFLAGS) -g3
	-@./a.out
	valgrind ./a.out
	$(MAKE) clean
	$(RM) a.out
