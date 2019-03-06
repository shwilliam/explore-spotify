module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/strict",
    "standard"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": require('./package.json').dependencies.react,
    },
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
};
