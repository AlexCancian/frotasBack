import { format, subHours } from "date-fns";

const generateDateTimeISO = (): string => {
  const now = new Date();
  return format(now, "yyyy-MM-dd'T'HH:mm:ssXXX");
};

export default generateDateTimeISO;