import { MONTHS } from "./constants";

export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);
  if (invalidDate(date)) {
    return stringDate;
  }
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const sortByDate = (stringDateA: string, stringDateB: string) => {
  const dateA = new Date(stringDateA);
  const dateB = new Date(stringDateB);

  if (invalidDate(dateA) || invalidDate(dateB)) {
    return 0;
  }

  return dateA.getTime() - dateB.getTime();
};

export const invalidDate = (date: any) => {
  return isNaN(date.valueOf());
};
