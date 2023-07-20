import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type commoditiesothers = {
    commoditytype: string;
    price: string;
    changevalue: string;
    changepercentage: string;
    lowprice: string;
    highprice: string;
    shorttime: string;
    quotejson: unknown;
    createdate: Generated<Timestamp>;
    updatedate: Timestamp;
};
export type pmquotes = {
    pmtype: string;
    bid: string;
    ask: string;
    low: string;
    high: string;
    changevalue: string;
    changepercentage: string;
    month1changevalue: string;
    month1changepercentage: string;
    year1changevalue: string;
    year1changepercentage: string;
    year1lowprice: string;
    year1highprice: string;
    longtime: string;
    quotejson: unknown;
    createdate: Generated<Timestamp>;
    updatedate: Timestamp;
};
export type DB = {
    _commoditiesothers: commoditiesothers;
    _pmquotes: pmquotes;
};
