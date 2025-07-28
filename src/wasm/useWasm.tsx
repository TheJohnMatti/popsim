import { useEffect, useRef } from 'react';
import createModule from './index.out.js';
import { FRAMES_PER_SECOND } from '../utils/index.js';

const useWasm = () => {
  const loaded = useRef<boolean>(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;


    createModule().then((Module) => {
      console.log('✅ WASM loaded');

      // Allocate memory in WASM heap
      const values = [1.1, 2.2, 3.3, 4.4];
      const n = values.length;

      // Allocate space in WASM memory
      const buf = Module._malloc(n * 4); // 4 bytes per float
      // Write to HEAPF32 (view of wasm memory as float32 array)
      Module.HEAPF32.set(values, buf >> 2);

      // Call the function
      Module.ccall(
        'init_engine',
        'number',
        ['number', 'number'],
        [buf, n]
      );

      Module._free(buf);

      setInterval(() => {
        Module.ccall('tick');
      }, 1000/FRAMES_PER_SECOND)

    });
  }, []);
};

export default useWasm;
