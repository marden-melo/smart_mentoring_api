import { parse, isValid } from 'date-fns';

export function convertToDate(
  dateString: string,
  format: string = 'yyyy-MM-dd',
): Date | null {
  const parsedDate = parse(dateString, format, new Date());

  return isValid(parsedDate) ? parsedDate : null;
}
