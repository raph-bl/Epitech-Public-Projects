##
## EPITECH PROJECT, 2024
## Makefile
## File description:
## Makefile
##

MAKEFLAGS += -s

CC = gcc
NAME = my_ls
NAMELIB = libmy.a
CFLAGS = -W -Wall -Wextra -L./lib/my/ -I./include -lmy -g3
SRC = $(shell find . -name "*.c")
OBJ = $(SRC:.c=.o)
CLEAN = find -name "*.gc*" -delete -o -name "*.o" -delete \
		-o -name $(NAME) -delete

all: $(NAMELIB)

$(NAMELIB): $(OBJ)
	ar -rc libmy.a $(OBJ)
	cp libmy.a lib/libmy.a && cp libmy.a lib/my/libmy.a
	cp lib/my/my.h include/my.h
	$(CC) -o $(NAME) $(OBJ) $(CFLAGS)
	find -name "*.o" -delete

clean:
	find -name "*.gc*" -delete
	find -name "*.o" -delete

fclean: clean
	$(RM) $(NAME)

re: fclean all
