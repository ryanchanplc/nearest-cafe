import Location from '../models/Location';

/**
 * calculate euclidean distance between 2 points
 * @param loc1 location1
 * @param loc2 location2
 * @returns euclidean distance
 */
export const euclideanDistance = (loc1: Location, loc2: Location): number => {
    const latDiff = loc1.latitude - loc2.latitude;
    const longDiff = loc1.longitude - loc2.longitude;
    return Math.sqrt(latDiff * latDiff + longDiff * longDiff);
};
