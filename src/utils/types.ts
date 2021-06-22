/**
 * check if the input is a valid number
 * @param str input
 * @returns boolean
 */
export const isNumber = (str: string): boolean => {
    return !isNaN(parseFloat(str)) && !isNaN(+str);
};
