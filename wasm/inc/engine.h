#include <iostream>
#include <vector>
#include "../inc/entity.h"


class Engine {
    public:
        Engine();
        ~Engine();
        void tick();
    private:
        std::vector<Entity> entities;
        int _elapsedTime{0};
};




struct EngineInitObj {
    std::vector<Entity> entities;
};