import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: {
    index: "src/index.ts",
  },
  output: [
    { dir: "dist", format: "es", preserveModules: true, sourcemap: true },
  ],
  external: (id) => /^(react|react-dom)(\/jsx-runtime)?$/.test(id),
  plugins: [
    resolve({ extensions: [".mjs", ".js", ".ts", ".tsx"] }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    postcss({
      modules: { generateScopedName: "[hash:base64:6]" },
      extract: false, // true,
      minimize: true,
      plugins: [autoprefixer()],
    }),
  ],
};

export default config;
