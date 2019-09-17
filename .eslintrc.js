module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
    "eslint:recommended"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    "indent": 2,
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["warn"],
    "semi":["warn"],
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "no-mixed-spaces-and-tabs": ["error"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "max-len": ["error", { "code": 150 }],
    "no-invalid-this":0,
    "no-global-assign":0,
    "new-cap":0,
    "no-unused-vars":0,
    "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
      }
    }]
  },
};
