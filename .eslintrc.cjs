module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:bot-whatsapp/recommended",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "bot-whatsapp"],
  rules: { "react/react-in-jsx-scope": "off", "react/prop-types": "off" },
  settings: { react: { version: "detect" } },
};
