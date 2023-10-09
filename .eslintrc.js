module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parserOptions: { 
		ecmaVersion: 6,
		sourceType: 'module'
	},
    extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"no-unused-vars": "warn",
		"@typescript-eslint/no-empty-function": "off"
	},
	parser: "@typescript-eslint/parser",
	/*
	plugins: [
		"@typescript-eslint",
	],
	*/
	exclude: ["node_modules", "dist"]
}
