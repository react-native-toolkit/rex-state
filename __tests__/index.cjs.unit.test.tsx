import Rex from "../lib/index";
import testRunner from "../src/testRunner";

const { default: useRex, createRexStore } = Rex;

testRunner("Testing CJS Build", useRex, createRexStore);
