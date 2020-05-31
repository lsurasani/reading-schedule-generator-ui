import { MONTHS } from "./constants";

export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);
  if (isNaN(date.valueOf())) {
    return stringDate;
  }
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
