import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: 'src/index.ts',
    compilerOptions: {
      moduleResolution: 'node',
      declaration: true,
      emitDeclarationOnly: true,
      noEmit: false,
    }
  },
  clean: true,
  sourcemap: true,
  minify: true,
  splitting: false,
  treeshake: true,
}) 