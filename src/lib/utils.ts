import { Subscription, User } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FREE_TRIAL_END } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CustomError = {
  error: string;
  devError?: string;
};

export function isError<T>(response: T | CustomError): response is CustomError {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}

export function exportCsv(string: string) {
  if (!string || string.length === 0) return;
  const blob = new Blob([string], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "export.csv";
  a.click();
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatPrice(priceInPennies: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(priceInPennies / 100);
}

export function formatNumber(num: number) {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(num);
}

export function formatPercent(num: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isSubscribed(user: User, subscription: Subscription | null) {
  return (
    (subscription && subscription.expiresAt.getTime() > Date.now()) ||
    isFreeTrialActive(user)
  );
}

export function isFreeTrialActive(user: User) {
  return user.freeTrialStart && Date.now() < FREE_TRIAL_END.getTime();
}
