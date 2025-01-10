module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'import/no-anonymous-default-export': 'off',
  },
  // Removed deprecated options
  // useEslintrc: false,
  // extensions: ['.js', '.jsx', '.ts', '.tsx'],
}