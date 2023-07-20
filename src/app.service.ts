import { Injectable, Inject } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class FetchService {
  constructor(
    @Inject('commoditiesCryptoNames') private commoditiesCryptoNames: string[],
    @Inject('commoditiesCryptoFetachNames') private commoditiesCryptoFetachNames: string[]
  ) { };

  async getAssetQuotes(assetType: string) {
    let productPriceSectionRE: RegExp;
    let priceSection: string;
    let dfRegularMarketPrice: string, dfRegularMarketChange: string, dfRegularMarketChangePercent: string, dfDaysRange: string;
    let dfGoldYearHigh: string, dfGoldYearLow: string, dfSilverYearHigh: string, dfSilverYearLow: string
    let dfArrayRE: RegExp;
    let priceMap: {};
    let priceArray: string[];
    let URL: string;
    let arrayCryptoRegEx: string[];

    //This `actualPriceRE` Regex will extract all the $xxx.xx format of prices from the extracted HTML content
    let actualPriceRE: RegExp = new RegExp(
      /[\+|\-|\$]*[\d\,]*\d+\.\d{1,2}[\%]*/,
      'ig');

    // RegEx to extract year high and year low for Gold/Silver
    let arrayGoldSilverRegEx: string[] = [
      '<div class="snapshot__data-item snapshot__data-item--small">\\s*(\\S*)\\s*<div class="snapshot__header">52 Week Low<\/div>',
      '<div class="snapshot__data-item snapshot__data-item--small snapshot__data-item--right">\\s*(\\S*)\\s*<div class="snapshot__header">52 Week High<\/div>'
    ];

    async function runGoldAsyncFunction() {
      await Promise.all([
        fetch('https://www.kitco.com/').then(function (response) {
          return response.text();
        }).then(function (html) {
          // This is the HTML from our response as a text string
          priceSection = productPriceSectionRE.exec(html)[0];
          priceArray = priceSection.match(actualPriceRE);
        }).catch(function (err) {
          console.warn('Cannot fetch URL - kitco.com', err);
        }),

        fetch('https://markets.businessinsider.com/commodities/gold-price').then(function (response) {
          // The API call was successful!
          return response.text();
        }).then(function (html) {
          //Loop through selected data fields in HTML
          arrayGoldSilverRegEx.forEach(function (item, index) {
            dfArrayRE = new RegExp(
              item,
              'i'
            );
            switch (index) {
              case 0: { //Gold 52 weeks Low
                const extractedValue = dfArrayRE.exec(html)[1];
                dfGoldYearLow = extractedValue
              };
                break;
              case 1: { //Gold 52 weeks High
                const extractedValue = dfArrayRE.exec(html)[1];
                dfGoldYearHigh = extractedValue
              };
                break;
            }
          });
        }).catch(function (err) {
          console.warn('Cannot fetch URL - markets.businessinsider.com', err);
        })
      ]);

      priceMap = {
        "bidask": priceArray[0] + ' | ' + priceArray[1],
        "lowhigh": priceArray[2] + ' | ' + priceArray[3],
        "change": priceArray[4] + ' | ' + priceArray[5],
        "1month": priceArray[6] + ' | ' + priceArray[7],
        "1year": priceArray[8] + ' | ' + priceArray[9],
        "yearlowhigh": dfGoldYearLow + ' | ' + dfGoldYearHigh,
        "time": "$longTime",
      };
    }

    async function runSilverAsyncFunction() {
      await Promise.all([
        fetch('http://www.kitcosilver.com/').then(function (response) {
          return response.text();
        }).then(function (html) {
          // This is the HTML from our response as a text string
          priceSection = productPriceSectionRE.exec(html)[0];
          priceArray = priceSection.match(actualPriceRE);
        }).catch(function (err) {
          console.warn('Cannot fetch URL - kitcosilver.com', err);
        }),

        fetch('https://markets.businessinsider.com/commodities/silver-price').then(function (response) {
          return response.text();
        }).then(function (html) {
          //Loop through selected data fields in HTML
          arrayGoldSilverRegEx.forEach(function (item, index) {
            dfArrayRE = new RegExp(
              item,
              'i'
            );
            switch (index) {
              case 0: { //Silver 52 weeks Low
                const extractedValue = dfArrayRE.exec(html)[1];
                dfSilverYearLow = extractedValue
              };
                break;
              case 1: { //Silver 52 weeks High
                const extractedValue = dfArrayRE.exec(html)[1];
                dfSilverYearHigh = extractedValue
              };
                break;
            }
          });
        }).catch(function (err) {
          console.warn('Cannot fetch URL - markets.businessinsider.com', err);
        })
      ]);
      priceMap = {
        "bidask": priceArray[0] + ' | ' + priceArray[1],
        "lowhigh": priceArray[2] + ' | ' + priceArray[3],
        "change": priceArray[4] + ' | ' + priceArray[5],
        "1month": priceArray[6] + ' | ' + priceArray[7],
        "1year": priceArray[8] + ' | ' + priceArray[9],
        "yearlowhigh": dfSilverYearLow + ' | ' + dfSilverYearHigh,
        "time": "$longTime",
      };
    }

    async function runCryptoOilUSDAsyncFunction() {
      // RegEx to extract values to 2 decimal place
      const strRangePairsRegEx = new RegExp('([\\d,]+?\\.\\d\\d)[ \\S]+?([\\d,]+?\\.\\d\\d)', 'i');

      const response = await fetch(URL);
      const html = await response.text();

      if (html == null || html == undefined) {
        console.error('Error fetching', URL);
      } else {
        dfRegularMarketPrice = '';
        //Loop through selected data fields in HTML
        arrayCryptoRegEx.forEach(function (item, index) {
          dfArrayRE = new RegExp(
            item,
            'i'
          );

          switch (index) {
            case 0: { //regularMarketPrice
              const extractedValue = dfArrayRE.exec(html)[1];
              const decimalIndex = (extractedValue.indexOf('.') > 0) ? extractedValue.indexOf('.') : 9; // extract the whole string if there is no decimal in value
              dfRegularMarketPrice = parseFloat(extractedValue.substring(0, decimalIndex + 3)).toLocaleString('en');
            };
              break;
            case 1: { //regularMarketChange
              const extractedValue = dfArrayRE.exec(html)[1];
              const decimalIndex = (extractedValue.indexOf('.') > 0) ? extractedValue.indexOf('.') : 9; // extract the whole string if there is no decimal in value
              dfRegularMarketChange = parseFloat(extractedValue.substring(0, decimalIndex + 3)).toLocaleString('en');
            };
              break;
            case 2: { //regularMarketChangePercent
              const extractedValue = dfArrayRE.exec(html)[1];
              const numExtractedValue = (Number(extractedValue) * 100);
              const decimalIndex = (extractedValue.indexOf('.') > 0) ? extractedValue.indexOf('.') : 9; // extract the whole string if there is no decimal in value
              dfRegularMarketChangePercent = numExtractedValue.toString().substring(0, decimalIndex + 3) + "%";
            };
              break;
            case 3: { //DAYS_RANGE
              const extractedValue = dfArrayRE.exec(html)[1];

              // clean up vales to 2 decimal place
              const extractedValueLow = strRangePairsRegEx.exec(extractedValue)[1];
              const extractedValueHigh = strRangePairsRegEx.exec(extractedValue)[2];

              dfDaysRange = extractedValueLow + '|' + extractedValueHigh;
            };
              break;
          }

        });

        if (dfRegularMarketPrice == '') {
          priceMap = {
            "price": '0',
            "change": '0' + ' | ' + '0',
            "lowhigh": '0' + ' | ' + '0',
            "time": "$longTime",
          };
        } else {
          priceMap = {
            "price": dfRegularMarketPrice,
            "change": dfRegularMarketChange + ' | ' + dfRegularMarketChangePercent,
            "lowhigh": dfDaysRange,
            "time": "$longTime",
          };
        }
      }
    }

    if (assetType == 'Gold') {
      productPriceSectionRE = new RegExp(
        /\<\!\-\- LIVE SPOT GOLD \-\-\>[\s\S]+?\<\!\-\- SILVER \& PGMS \-\-\>/,
        'i'
      );

      await runGoldAsyncFunction();
    }

    if (assetType == 'Silver') {
      productPriceSectionRE = new RegExp(
        /Live Spot Silver Price[\s\S]+?\<\!\-\- BEGIN KITCO 10am FIX \-\-\>/,
        'i'
      );
      await runSilverAsyncFunction();
    }

    if (assetType != 'Gold' && assetType != 'Silver') {
      const assetIndex = this.commoditiesCryptoNames.indexOf(assetType);

      URL = 'https://finance.yahoo.com/quote/' + this.commoditiesCryptoFetachNames[assetIndex] + '/';

      // RegEx to appropriate data fields from HTML
      arrayCryptoRegEx = [
        'data-symbol="' + this.commoditiesCryptoFetachNames[assetIndex] + '"[ \\S]+?data-field=\"regularMarketPrice\"[\\s\\S]+?value=\"([\\s\\S]+?)\"',
        'data-symbol="' + this.commoditiesCryptoFetachNames[assetIndex] + '"[\\s\\S]+?data-field=\"regularMarketChange\"[\\s\\S]+?value=\"([\\s\\S]+?)\"',
        'data-symbol="' + this.commoditiesCryptoFetachNames[assetIndex] + '" data-field=\"regularMarketChangePercent\"[ \\S]+?data-pricehint[ \\S]+?value=\"([\\S]+?)\"',
        'data-test="DAYS_RANGE-value">([\\s\\S]+?)</td>'
      ];

      await runCryptoOilUSDAsyncFunction();
    }
    return priceMap;
  }
}

