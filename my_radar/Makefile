##
## EPITECH PROJECT, 2025
## my_radar
## File description:
## Makefile
##

SRC = $(shell find -name "*.c")
OBJ = $(SRC:.c=.o)

NAME = my_radar

CFLAGS = -W -Wall -Wextra -L./lib/my/ -I./include -lmy -lshell -g3
CSFMLFLAGS = -lcsfml-graphics -lcsfml-window -lcsfml-system -lm

all: $(NAME)

$(NAME): $(OBJ)
	ar -rc libmy.a $(OBJ)
	cp libmy.a lib/libmy.a && cp libmy.a lib/my/libmy.a
	cp lib/my/my.h include/my.h
	$(CC) -o $(NAME) $(OBJ) $(CFLAGS) $(CSFMLFLAGS)

clean:
	find -name "libmy.a" -delete
	find -name "*.gc*" -delete
	find -name "*.o" -delete

fclean: clean
	$(RM) $(NAME)

re: fclean all
