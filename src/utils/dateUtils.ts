import dayjs from 'dayjs';

export const dateFormat = (
  date: Date | string,
  formatter: string = 'YYYY-MM-DD',
): string => {
  return dayjs(date).format(formatter);
};
