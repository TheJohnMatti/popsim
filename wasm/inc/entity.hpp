#include <iostream>
#include "./vec.hpp"
#include "./id.hpp"


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