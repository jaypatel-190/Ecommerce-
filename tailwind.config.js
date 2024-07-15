import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"), // Add the scrollbar plugin
  ],
  variants: {
    scrollbar: ["rounded"], // Optional: enable rounded variant
  },
});
