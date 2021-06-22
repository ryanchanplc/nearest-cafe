import { euclideanDistance } from '../utils/maths';
import { isValidArgument } from '../utils/args';
import { isNumber } from '../utils/types';
import { parse, verify } from '../utils/csv';
import * as ERROR from '../constants/error';
import Location from '../models/Location';
import CafeList from '../models/CafeList';

it('should check arguments correctly', () => {
    expect(isValidArgument(['a', '2', 'test'])).toBe(false);
    expect(isValidArgument(['1', 'b', 'test'])).toBe(false);
    expect(isValidArgument(['a', 'b', 'c'])).toBe(false);
    expect(isValidArgument(['1'])).toBe(false);
    expect(isValidArgument(['1', '2', 'test'])).toBe(true);
});

it('should check if input is a number', () => {
    expect(isNumber('123.456')).toBe(true);
    expect(isNumber('123456')).toBe(true);
    expect(isNumber('-123')).toBe(true);
    expect(isNumber('-123.456')).toBe(true);
    expect(isNumber('ABC')).toBe(false);
    expect(isNumber('')).toBe(false);
});

it('should parse CSV into a nestedArray correctly', () => {
    const convertChar = (num: number) => String.fromCharCode(64 + num);
    const csvStr = '123,456,789\nABC,DEF,GHI';

    const result = parse(csvStr);
    expect(result.length).toBe(2);

    for (let i = 0; i < 2; i++) expect(result[i].length).toBe(3);
    for (let j = 0; j < 3; j++) {
        const first = j * 3 + 1;
        const second = j * 3 + 2;
        const third = j * 3 + 3;

        expect(result[0][j]).toBe(`${first}${second}${third}`);
        expect(result[1][j]).toBe(`${convertChar(first)}${convertChar(second)}${convertChar(third)}`);
    }
});

it('should handle malformed CSV Array', () => {
    const parseAndVerify = (str: string) => {
        const nested = parse(str);
        return () => verify(nested);
    };
    expect(parseAndVerify('123,456,789')).not.toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456,789\n')).not.toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456,789\n\n')).not.toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('')).not.toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456')).toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456,,')).toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456,,,')).toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,,,456')).toThrow(ERROR.ERROR_CSV);
    expect(parseAndVerify('123,456,789\nABC')).toThrow(ERROR.ERROR_CSV);
});

it('should calculate distance correctly', () => {
    const loc1 = new Location('3', '3');
    const loc2 = new Location('6', '7');
    expect(euclideanDistance(loc1, loc2)).toBe(5);
});

it('should sort into array of cafe in asc order correctly', () => {
    const data = [
        ['A', '200', '200'],
        ['B', '2', '2'],
        ['C', '-100', '-100'],
    ];
    const userLocation = new Location('0', '0');
    const sorted = new CafeList(data).sortByUserDistance(userLocation);
    expect(sorted.length).toBe(3);

    for (let i = 0; i < sorted.length - 1; i++) expect(sorted[i].distance).toBeLessThanOrEqual(sorted[i + 1].distance);
});
