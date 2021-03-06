import aggregate from "./base/aggregator";
import getTypeConverter from "./base/type-converter";

function max(accumulator, value, converter) {
    let converted = converter(value);

    return isNaN(converted) ? false : Math.max(accumulator, converted);
}

export default function minOf(array, callback) {

    callback = callback || (item => item);  

    let firstValue = callback.call(array, array[0]);
    let converter = getTypeConverter(firstValue);

    return aggregate(array, (accumulator, item, array) => { 
        let value = callback.call(array, item);

        return max(accumulator, value, converter);
    }, -Infinity);
}