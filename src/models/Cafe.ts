import Location from './Location';
import { euclideanDistance } from '../utils/maths';

const RESULT_DECIMAL = 4;
/**
 * Cafe Object
 */
export default class Cafe {
    private _name: string;
    private _location: Location;
    private _distance: number;

    constructor(name: string, location: Location) {
        this._name = name;
        this._location = location;
        this._distance = 0;
    }

    public get distance(): number {
        return this._distance;
    }

    /**
     * calculate distance from user location
     * @param userLocation user location
     */
    public setDistanceFrom(userLocation: Location): void {
        this._distance = euclideanDistance(userLocation, this._location);
    }

    /**
     * print cafe info
     * @returns a string with template name,distance
     */
    public print(): string {
        return `${this._name},${this._distance.toFixed(RESULT_DECIMAL)}`;
    }
}
