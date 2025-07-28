#include <iostream>
#include <chrono>
#include "../inc/api.h"
#include "../inc/macros.h"

int init_engine_impl(EngineInitObj& init) {

    Engine& engine = Engine::getInstance();
    std::cout << &engine << std::endl;

    return OK;
};
void tick_impl() {
    using namespace std::chrono;
    static steady_clock::time_point last = steady_clock::now();
    steady_clock::time_point now = steady_clock::now();
    auto diff = duration_cast<milliseconds>(now - last).count();
    last = now;


    
};