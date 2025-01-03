import { format, subHours } from "date-fns";

const generateDateTimeISO = (): string => {
  const now = new Date();
  const adjustedTime = subHours(now, 3); // Ajusta para UTC-3
  return format(adjustedTime, "yyyy-MM-dd'T'HH:mm:ssXXX");
};

export default generateDateTimeISO;
