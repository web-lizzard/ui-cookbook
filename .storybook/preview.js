import '@/assets/scss/base/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  background: {
    default: 'dark',
    values: [
      {
        name: "dark",
        value: '#222223'
      }
    ]
  }
}