module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "always"], 
    "semi-style": ["error", "last"],
    "quotes": ["error", "double"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "indent": ["error", 2]
  }
};
