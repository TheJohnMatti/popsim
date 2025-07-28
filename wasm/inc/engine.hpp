#include <iostream>
#include <vector>
#include "../inc/entity.hpp"


class Engine {
    public:
        static Engine& getInstance();
        void tick();
    private:
        Engine();
        ~Engine();
        std::vector<Entity> entities;
        int _elapsedTime{0};
};




struct EngineInitObj {
    std::vector<Entity> entities;
};