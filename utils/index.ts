export const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month
  const day = String(newDate.getDate()).padStart(2, "0");
  const year = newDate.getFullYear();

  return `${month}-${day}-${year}`;
};
