#define ID_LENGTH 37

class id_t {
    public:
        id_t();
        id_t(char id[ID_LENGTH]);
        char* get_id();
        bool operator==(id_t rhs);
        id_t(id_t& rhs);
    private:
        char _value[ID_LENGTH];

};