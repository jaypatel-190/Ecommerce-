import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // Add the scrollbar plugin
  ],
  variants: {
    scrollbar: ["rounded"], // Optional: enable rounded variant
  },
});
