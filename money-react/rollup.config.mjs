/*import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import commonjs from "@rollup/plugin-commonjs";
*/

/*import path from "path";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
*/

import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];

// Treat CSS modules as "external" so Rollup leaves the import in the output.
// Then we copy the files to dist so the import resolves for consumers.
const isCssModule = (id) => /\.module\.css$/i.test(id);

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      // dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
    },
    /* {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
    },
    */
  ],
  external: (id) =>
    // your normal externals
    id === "react" ||
    id === "react-dom" ||
    id === "react/jsx-runtime" ||
    // leave CSS module imports in-place
    isCssModule(id),
  plugins: [
    nodeResolve({ extensions }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json", // no outDir, no declarationDir; see below
      // IMPORTANT: let Rollup place JS; don't emit declarations here
      declaration: false,
      emitDeclarationOnly: false,
      noEmit: false,
    }),
    // Copy the source .module.css files to both ESM/CJS dists, preserving structure
    copy({
      targets: [
        { src: "src/**/*.module.css", dest: "dist" },
        //    { src: "src/**/*.module.css", dest: "dist/cjs" },
      ],
      // Keep folder structure under dist/* matching src/*
      flatten: false,
      verbose: true,
    }),
  ],
};

/*const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    // ESM build (recommended for tree-shaking)
    {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true, // <-- keeps folder structure
      preserveModulesRoot: "src", // nice clean paths under dist/esm
      entryFileNames: "[name].js",
      assetFileNames: "[name][extname]",
    },
    // CJS build (optional, if you need it)
    {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
      assetFileNames: "[name][extname]",
    },
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    nodeResolve({ extensions }),
    commonjs(),
    postcss({
      // Turn on CSS Modules for *.module.css files only (auto detects)
      // This keeps your `import styles from './A.module.css'` pattern working.
      modules: {
        generateScopedName: "[name]__[local]__[hash:base64:5]",
      },
      // IMPORTANT PARTS:
      // 1) extract: true emits actual .css files instead of injecting <style> at runtime
      // 2) With preserveModules: true above, postcss will emit per-module CSS files
      extract: true,
      minimize: true,
      // don’t set `inject: true` — that would inline styles via <style> tags at runtime
    }),
    typescript({
      tsconfig: "tsconfig.json",
      // declaration: true,
      // declarationDir: "dist/types",
      rootDir: "src",

      declaration: false,
      emitDeclarationOnly: false,
      noEmit: false,
      // Emit ESM; CJS is handled by Rollup's second output block
    }),
  ],
};
*/

/*const config = {
  input: {
    index: "src/index.ts",
  },
  output: [
    { dir: "dist", format: "es", preserveModules: true, sourcemap: false },
  ],
  external: (id) => /^(react|react-dom)(\/jsx-runtime)?$/.test(id),
  plugins: [
    resolve({ extensions: [".mjs", ".js", ".ts", ".tsx"] }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    postcss({
      modules: { generateScopedName: "[hash:base64:6]" },
      extract: true,
      minimize: false,
      inject: true,
      plugins: [autoprefixer()],
    }),
  ],
};

export default config;
*/
