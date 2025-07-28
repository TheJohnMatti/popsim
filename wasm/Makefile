# Variables
SRC = .\src\main.cpp .\src\vec.cpp .\src\entity.cpp .\src\engine.cpp .\src\id.cpp .\src\api.cpp
OUT_DIR = ..\src\wasm
OUT_WASM = $(OUT_DIR)\index.out.wasm
OUT = $(OUT_DIR)\index.out.js
EMCC_FLAGS =
LINKS =

# Add additional sources to SRC, separated by spaces
# Add additional linker flags to LINKS, separated by spaces

all: build

build:
	emcc $(SRC) $(EMCC_FLAGS) $(LINKS) -o $(OUT) \
	-s MODULARIZE=1 \
	-s EXPORT_ES6=1 \
	-s ENVIRONMENT=web \
	-s EXPORTED_FUNCTIONS="['_init_engine', '_tick', '_malloc', '_free']" \
	-s EXPORTED_RUNTIME_METHODS='["ccall", "HEAPF32"]'

clean:
	del "$(OUT)" "$(OUT_WASM)"

.PHONY: all build clean