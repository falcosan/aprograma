module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'never',
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    }
  ]
};
