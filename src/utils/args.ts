import { isNumber } from './types';
import { ERROR_ARG_FIRST_INVALID, ERROR_ARG_SECOND_INVALID, ERROR_ARG_NOTENOUGH } from '../constants/error';

/**
 * check arguments are valid
 * @param args [lat, long, url]
 * @returns a boolean showing if arguments are valid
 */
export const isValidArgument = (args: string[]): boolean => {
    if (args.length != 3) {
        console.log(ERROR_ARG_NOTENOUGH);
        return false;
    }

    if (!isNumber(args[0])) {
        console.log(ERROR_ARG_FIRST_INVALID);
        return false;
    }

    if (!isNumber(args[1])) {
        console.log(ERROR_ARG_SECOND_INVALID);
        return false;
    }

    return true;
};
