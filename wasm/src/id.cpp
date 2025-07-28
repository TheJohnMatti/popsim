#include <iostream>
#include "../inc/id.hpp"


id_t::id_t() : _value{0} {};

id_t::id_t(char id[ID_LENGTH]) {
    for (int i = 0; i < ID_LENGTH; i++) {
        _value[i] = id[i];
    }
};

id_t::id_t(id_t& rhs) {
    char* other_id = rhs.get_id();
    for (int i = 0; i < ID_LENGTH; i++) {
        _value[i] = other_id[i];
    }
}

char* id_t::get_id() {
    return _value;
}

bool id_t::operator==(id_t rhs) {
    char* other_id = rhs.get_id();
    for (int i = 0; i < ID_LENGTH; i++) {
        if (other_id[i] != _value[i]) return false;
    }
    return true;
}

std::ostream& operator<<(std::ostream& stream, id_t obj) {
    return stream << obj.get_id();
}
