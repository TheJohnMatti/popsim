#include <iostream>
#include <emscripten/emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int print_test(char* str) {
        std::cout << "hello world." << str << std::endl;
        return 0;
    }
}

int main() {
    std::cout << "hello world." << std::endl;
    return 0;
}
