import { useEffect, useRef } from 'react';
import createModule from './index.out.js';

const useWasm = () => {


  const loaded = useRef<boolean>(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;


    createModule().then((Module) => {
      console.log('✅ WASM loaded');

      Module.ccall('print_test', 'number', ['string'], [' + TEST_STR'])


    });
  }, []);
};

export default useWasm;
