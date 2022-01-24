export const flattenJson = (obj) => {
    let flattened_obj = {};
    let keys = Object.keys(obj);
    keys.forEach(key => {
        if (obj[key] && typeof obj[key] == "object") {
            let subKeys = Object.keys(obj[key]);
            subKeys.forEach(subKey => {
                flattened_obj[key + '_' + subKey] = obj[key][subKey]
            })
        } else {
            if (obj[key] && obj[key].data) {
                flattened_obj[key] = obj[key].data;
            } else {
                flattened_obj[key] = obj[key];
            }
        }
    })
    return flattened_obj;
}
export const prettyCasing = (string) => {
    let splitString = string.split('_');
    let res = "";
    splitString.map(string => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
    })
    return res;
}
export const getColor = (alpha) => {
    let r1 = (Math.random() * 255).toFixed(2)
    let r2 = (Math.random() * 255).toFixed(2)
    let r3 = (Math.random() * 255).toFixed(2)
    return ['rgb(' + r1 + ',' + r2 + ',' + r3 + ',' + alpha + ')', 'rgb(' + r1 + ',' + r2 + ',' + r3 + ',1)'];
}
