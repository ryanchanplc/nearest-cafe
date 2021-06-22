import Location from '../models/Location';
import Cafe from '../models/Cafe';

/**
 * CafeList Object
 */
export default class CafeList {
    private _cafes: Cafe[];

    constructor(nestedArray: string[][]) {
        this._cafes = nestedArray.map((array) => new Cafe(array[0], new Location(array[1], array[2])));
    }

    /**
     * sort cafes array by user distance
     * @param userLocation user location
     * @returns a sort array in ascending order by distance
     */
    public sortByUserDistance(userLocation: Location): Cafe[] {
        return this._cafes
            .map((cafe) => {
                cafe.setDistanceFrom(userLocation);
                return cafe;
            })
            .sort(
                (current, next) => current.distance - next.distance, //compare
            );
    }
}
