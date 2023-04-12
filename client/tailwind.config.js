/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.jsx", "./src/*.jsx"],
	theme: {
		extend: {
			screens: {
				xxs: "0px",
				xs: "550px", // Add a new breakpoint
				sm: "700px",
				md: "900px",
				lg: "1124px",
				xl: "1536px",
			},
		},
	},
	plugins: [],
};
