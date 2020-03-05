import useRex, { createRexStore } from "../lib/index.m";
import testRunner from "../src/testRunner";

testRunner("Testing ESM Build", useRex, createRexStore);
