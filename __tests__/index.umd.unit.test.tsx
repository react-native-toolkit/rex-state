import Rex from "../lib/index.umd";
import testRunner from "../src/testRunner";

const { default: useRex, createRexStore } = Rex;

testRunner("Testing UMD Build", useRex, createRexStore);
