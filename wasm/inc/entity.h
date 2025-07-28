#include <iostream>
#include "../inc/vec.h"
#include "../inc/id.h"


class Entity {
    public:
        Entity();
        Entity(Vector2 p, Vector2 v, Vector2 a, id_t id);
        ~Entity();
    private:
        Vector2 _p;
        Vector2 _v;
        Vector2 _a;
        id_t _id;
        

};