import Location from './models/Location';
import CafeList from './models/CafeList';
import { getData } from './utils/csv';
import { isValidArgument } from './utils/args';

/**
 * main function
 * @param lat latitiude
 * @param long longitude
 * @param url csv url
 */
const main = async (lat: string, long: string, url: string) => {
    const userLocation = new Location(lat, long);
    const data = await getData(url);

    if (data) {
        const result = new CafeList(data)
            .sortByUserDistance(userLocation)
            .slice(0, 3) //first three
            .map((cafe) => cafe.print())
            .join('\n');

        console.log(result);
    }
};

const args = process.argv.slice(2, 5);
if (isValidArgument(args)) {
    main(args[0], args[1], args[2]);
}
