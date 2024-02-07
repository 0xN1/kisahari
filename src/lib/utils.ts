import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, option?: "all" | "time" | "date") => {
  // format in 22:11 - Tue 5 feb 24
  const d = new Date(date);
  const day = d.toLocaleString("en-US", { weekday: "short" });
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.toLocaleString("en-US", { year: "2-digit" });

  const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();

  const minute = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  const second = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();

  if (option === "time") {
    return `${hour}:${minute}:${second}`;
  }

  if (option === "date") {
    return `${
      d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
    } ${month} ${year}`;
  }

  return `${hour}:${minute} - ${day} ${
    d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
  } ${month} ${year}`;
};
