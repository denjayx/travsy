/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
  tailwindAttributes: ['className'],
  tailwindFunctions: ['tw'],
}