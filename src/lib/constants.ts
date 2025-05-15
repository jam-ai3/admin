import { Birthstone, Lato } from "next/font/google";

export const MAIN_SITE_URL = "https://jamai.dev";
export const UNAUTH_REDIRECT_PATH = "/login";
export const ACCOUNT_PATH = "/account";
export const PRICING_PATH = "/pricing";

export const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;
export const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30;
export const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;

export const TABLE_ROWS_PER_PAGE = 15;
export const ACCENT_COLOR = "#049904"
export const MD_WIDTH = 768;

export const FREE_TRIAL_END = new Date("2026-01-01");

export type Product = {
  id: string;
  name: string;
  description: string;
  priceInPennies: number;
  isSubscription: boolean;
  subscriptionInterval: "day" | "week" | "month" | "year";
  discount?: number;
};

export const FREE_TRIAL: Product = {
  id: "0",
  name: "Free Trial",
  description: "Unlimited use of flashcards generator for a one-week period",
  priceInPennies: 0,
  isSubscription: false,
  subscriptionInterval: "week",
};

export const PRODUCTS: Record<string, Product> = {
  monthly: {
    id: "1",
    name: "Monthly Subscription",
    description: "Unlimited use of flashcards generator for a one-month period",
    priceInPennies: 499,
    isSubscription: true,
    subscriptionInterval: "month",
  },
  yearly: {
    id: "2",
    name: "Yearly Subscription",
    description: "Unlimited use of flashcards generator for a one-year period",
    priceInPennies: 4999,
    isSubscription: true,
    subscriptionInterval: "year",
    discount: 0.17,
  },
};

export const PRODUCTS_ARRAY: Product[] = Object.values(PRODUCTS);

// Fonts

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lato",
});

export const birthstone = Birthstone({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
  variable: "--font-birthstone",
});
