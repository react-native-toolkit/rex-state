import useRex, { createRexStore } from "../lib/index.umd";
import testRunner from "../src/testRunner";

testRunner("Testing UMD Build", useRex, createRexStore);
