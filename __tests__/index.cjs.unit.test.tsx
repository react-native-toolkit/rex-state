import useRex, { createRexStore } from "../lib/index";
import testRunner from "../src/testRunner";

testRunner("Testing CJS Build", useRex, createRexStore);
