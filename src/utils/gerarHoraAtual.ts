const generateDateTimeISO = (): string => {
  const now = new Date();
  return now.toISOString();
};

export default generateDateTimeISO;
