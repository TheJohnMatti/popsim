#include <iostream>
#include "../inc/entity.hpp"


Entity::Entity() {};

Entity::Entity(Vector2 p, Vector2 v, Vector2 a, id_t id) : _p{p}, _v{v}, _a{a}, _id{id} {}

Entity::~Entity() {};

