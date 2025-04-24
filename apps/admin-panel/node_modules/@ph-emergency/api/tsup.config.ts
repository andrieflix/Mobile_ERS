import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
  sourcemap: true,
  minify: true,
  splitting: false,
  treeshake: true,
  onSuccess: 'tsc --emitDeclarationOnly',
}) 