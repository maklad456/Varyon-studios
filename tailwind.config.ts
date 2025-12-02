import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vs: {
          bgLight: "#FAFFFD",
          bgDark: "#000000",
          textStrong: "#000000",
          textBody: "#485563",
          textOnDark: "#9CA3AF",
          accent: "#10B981",
          accentSoft: "#6EE7B7",
        },
        text_primary: "#111111",
        text_muted: "#6B7280",
        text_light: "#FFFFFF",
        accent_orange: "#FF6A00",
        accent_orange_alt: "#FF6A1A",
        accent_pink: "#FF1F70",
        accent_tkf_pink: "#ED6D70",
        accent_tkf_yellow: "#F9E37A",
        accent_matrix_green: "#1B9C85",
        neutral_light: "#F5F5F7",
        neutral_light_alt: "#F7F7F8",
        neutral_dark: "#050715",
        neutral_dark_black: "#000000",
        bg_stripe: "#F9FAFB",
        border_soft: "#E5E7EB",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "14px",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
        strong: "0 6px 24px rgba(0, 0, 0, 0.15)",
        soft_dark: "0 18px 45px rgba(0, 0, 0, 0.45)",
      },
      fontFamily: {
        suisse: ["var(--font-suisse-intl)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
