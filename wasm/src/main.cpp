#include <iostream>
#include <emscripten/emscripten.h>
#include "../inc/macros.h"

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int print_test(char* str) {
        std::cout << "hello world." << str << std::endl;
        return 0;
    }

    EMSCRIPTEN_KEEPALIVE
    int init_engine() {


        return SUCC;
    }

    void tick() {
        
    }


}

int main() {
    std::cout << "hello world." << std::endl;
    return 0;
}



