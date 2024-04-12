module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{vue,scss}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
}
