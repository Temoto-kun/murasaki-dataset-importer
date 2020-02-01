import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser, } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
	{
		input: './lib/index.mjs',
		output: {
			file: pkg.main,
			type: 'cjs',
		},
		external: [
			'fs',
			'zlib',
			'stream',
			'@babel/runtime/helpers/defineProperty',
			'@babel/runtime/helpers/objectWithoutProperties',
		],
		plugins: [
			peerDepsExternal({
				includeDependencies: true,
			}),
			babel({
				ignore: ['node_modules/**'],
				runtimeHelpers: true,
			}),
			commonjs({
				exclude: /node_modules/,
			}),
			process.env.NODE_ENV === 'production' && terser(),
		],
	},
	{
		input: './lib/index.mjs',
		output: {
			file: pkg.module,
			type: 'esm',
		},
		external: [
			'fs',
			'zlib',
			'stream',
			'@babel/runtime/helpers/defineProperty',
			'@babel/runtime/helpers/objectWithoutProperties',
		],
		plugins: [
			peerDepsExternal({
				includeDependencies: true,
			}),
			babel({
				ignore: ['node_modules/**'],
				runtimeHelpers: true,
			}),
			nodeResolve(),
			commonjs(),
			process.env.NODE_ENV === 'production' && terser(),
		],
	},
]
