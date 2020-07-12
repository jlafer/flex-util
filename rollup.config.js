import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
//import pkg from './package.json';

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = (NODE_ENV === "production")
  ? "./dist/prod.js"
  : "./dist/dev.js";

export default [
	{
		input: 'src/index.js',
    output: {
      file: outputFile,
      format: "cjs" 
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      }),
			babel({
        exclude: ['node_modules/**']
			}),
      resolve(), // so Rollup can find and import dependencies from 'node_modules'
			commonjs() // so Rollup can import CommonJS modules
    ]
	}
];
