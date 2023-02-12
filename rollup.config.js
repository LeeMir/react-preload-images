import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import prettier from 'rollup-plugin-prettier';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';

const extensions = ['js', 'ts', 'jsx', 'tsx'];

process.env.BABEL_ENV = 'production';

export default [
  // js 번들링
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'es' }],

    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      babel({
        extensions,
        babelHelpers: 'runtime',
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: /node_modules/,
      }),
      commonjs({ include: 'node_modules/**' }),
      uglify(),
    ],
  },
  // 타입 정의 파일 번들링
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'cjs' }],

    plugins: [
      dts(),
      prettier({
        tabWidth: 2,
        parser: 'typescript',
      }),
    ],
  },
];
