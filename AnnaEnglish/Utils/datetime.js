/**
 * @param {Date} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  const today = (new Date()).setHours(0, 0, 0, 0);
  return date?.setHours(0, 0, 0, 0) === today;
}