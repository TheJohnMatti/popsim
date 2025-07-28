#include <iostream>
#include <emscripten/emscripten.h>
#include "../inc/api.h"

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int init_engine(float* values, int length) {

        for (int i = 0; i < length; ++i) {
            std::cout << "value[" << i << "] = " << values[i] << std::endl;
        }
        return 0;
    }

    EMSCRIPTEN_KEEPALIVE
    void tick() {
        tick_impl();
    }
}
