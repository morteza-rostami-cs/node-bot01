// const { createDefaultPreset } = require("ts-jest");
import { createDefaultPreset } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";
// import tsconfigJson from "./tsconfig.json" assert { type: "json" };

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest/presets/default-esm", // important for ESM support
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    ...tsJestTransformCfg,
  },
  extensionsToTreatAsEsm: [".ts"], // treat TS files as ESM
};
