function generateRandomPoints(center, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(Object.assign({id: i,status:userStateGenerator()}, generateRandomPoint(center, radius)));
    }
    return points;
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function userStateGenerator() {
    const items   = ['seeking', 'idle', 'digging', 'winner'];
    const weights = [131, 23, 71, 2];
    let total     = 0;
    let ranges    = weights.slice(0);
    for (var i = 0, len = weights.length; i < len; i++) {
        ranges[i] = [total, total += ranges[i]];
    }
    let randomNumber = parseInt(Math.random() * total);
    for (; randomNumber < ranges[--i][0];);
    return items[i];
}

function generateRandomPoint(center, radius) {
    const x0 = center.lng;
    const y0 = center.lat;
    const rd = radius / 111300;
    const u  = Math.random();
    const v  = Math.random();
    const w  = rd * Math.sqrt(u);
    const t  = 2 * Math.PI * v;
    const x  = w * Math.cos(t);
    const y  = w * Math.sin(t);
    const xp = x / Math.cos(y0);
    return {'lat': y + y0, 'lng': xp + x0};
}

export function getLocation(cb) {
    const geo_array = generateRandomPoints({'lat': 35.789743, 'lng': 51.399843}, 250, 200);
    return setTimeout(_ => {
        cb(geo_array[getRandom(0, 100)]);
    }, 100)
}