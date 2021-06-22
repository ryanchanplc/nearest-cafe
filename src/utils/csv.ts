import axios from 'axios';
import { ERROR_URL, ERROR_CSV } from '../constants/error';
import { isNumber } from './types';

const CSV_DELIMITER = ',';
const CSV_NEWLINE = '\n';
/**
 * read, verify and construct nested array
 * @param url csv url
 * @returns a nested array of string
 */
export const getData = async (url: string): Promise<string[][] | undefined> => {
    try {
        const data = await fetch(url)
            .then((data) => parse(data))
            .then((data) => verify(data));

        return data;
    } catch (err) {
        console.log(err);
    }
};
/**
 * fetching from url
 * @param url csv url
 * @returns promise
 */
export const fetch = (url: string): Promise<string> =>
    axios
        .get(url)
        .then((response) => response.data)
        .catch(() => {
            console.log(ERROR_URL);
        });

/**
 * parse csv string into nested array of string
 * @param csv csv string
 * @returns nested array of string
 */
export const parse = (csv: string): string[][] => {
    return csv
        .split(CSV_NEWLINE)
        .filter((str) => str !== '')
        .map((str) => str.split(CSV_DELIMITER));
};

/**
 * verify the nest array, throw error if invalid
 * @param nestedArray nested array of string
 * @returns nested array of string
 */
export const verify = (nestedArray: string[][]): string[][] => {
    nestedArray.forEach((row) => {
        if (row.length != 3 || row[0] === '' || !isNumber(row[1]) || !isNumber(row[2])) throw new Error(ERROR_CSV);
    });
    return nestedArray;
};
