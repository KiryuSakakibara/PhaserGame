module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: { 
		ecmaVersion: 6,
		sourceType: 'module'
	},
	plugins: [
		"@typescript-eslint",
	],
	env: {
		es6: true,
		browser: true,
	},
    extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	rules: {
		"no-unused-vars": "warn"
	},
	exclude: ["node_modules", "dist"]
}
