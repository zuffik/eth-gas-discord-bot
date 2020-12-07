import axios from "axios";

export const httpClient = axios.create({
    baseURL: `https://data-api.defipulse.com/api/v1/egs/api`,
    params: {
        'api-key': process.env.ETHGAS_API_KEY
    },
    responseType: 'json'
});

export interface EthGasResponse {
    fast: number;
    fastest: number;
    safeLow: number;
    average: number;
    block_time: number;
    blockNum: number;
    speed: number;
    safeLowWait: number;
    avgWait: number;
    fastWait: number;
    fastestWait: number;
    gasPriceRange: {
        4: number;
        6: number;
        8: number;
        10: number;
        20: number;
        30: number;
        40: number;
        50: number;
        60: number;
        70: number;
        80: number;
        90: number;
        100: number;
        110: number;
        120: number;
        130: number;
        140: number;
        150: number;
        160: number;
        168: number;
        170: number;
        180: number;
        190: number;
        200: number;
        220: number;
        240: number;
        260: number;
        280: number;
        300: number;
        320: number;
        340: number;
        360: number;
        380: number;
        400: number;
        410: number;
        420: number;
        440: number;
        460: number;
    }
}
