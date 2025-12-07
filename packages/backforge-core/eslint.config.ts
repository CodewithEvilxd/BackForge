// @ts-expect-error
import prettier from "eslint-config-prettier";

import parserTs from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.ts", "**/*.js", "!eslint.config.ts", "!dist/**", "!node_modules/**", "!src/scaffold/templates/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: parserTs,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.lint.json"
      }
    },
    plugins: {
      "@typescript-eslint": pluginTs
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "warn",
      "no-console": "off"
    }
  },
  prettier
];
