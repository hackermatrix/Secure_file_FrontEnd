/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Define a custom class under the `extend` section
      // Use the `customDropdownToggle` class name as the key
      'customDropdownToggle': {
        background: 'none',
        paddingRight: '1rem',
      },
    },
  },
  plugins: [],
}
