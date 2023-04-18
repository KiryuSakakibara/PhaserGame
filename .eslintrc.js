module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: { 
		ecmaVersion: 6,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true,
	},
    extends: [
		'eslint:recommended'
	],
	rules: {
		"no-unused-vars": "warn"
	}
}
