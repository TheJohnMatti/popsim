#include <iostream>
#include "../inc/engine.hpp"

Engine::Engine() {}
Engine::~Engine() {}
Engine& Engine::getInstance() {
    static Engine i;
    return i;
}

void Engine::tick() {
    
}