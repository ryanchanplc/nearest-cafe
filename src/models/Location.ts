/**
 * Location Object
 */
export default class Location {
    private _latitude: number;
    private _longitude: number;

    constructor(latitude: string, longitude: string) {
        this._latitude = Number(latitude);
        this._longitude = Number(longitude);
    }

    public get latitude(): number {
        return this._latitude;
    }

    public get longitude(): number {
        return this._longitude;
    }
}
