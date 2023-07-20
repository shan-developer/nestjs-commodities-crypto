import { db } from './database'
import { Controller, Get, Param, Inject, Injectable } from '@nestjs/common';
import { FetchService } from './app.service';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(
    private readonly fetchService: FetchService,
    @Inject('commoditiesCryptoNames') private commoditiesCryptoNames: string[],
    @Inject('commoditiesCryptoFetachNames') private commoditiesCryptoFetachNames: string[]
  ) { };

  @Get()
  returnNoRoute() {
    return "No Route.";
  }

  @Get('updateQuotes')
  async updateAssetQuotes() {
    let result: {};
    result = await this.fetchService.getAssetQuotes('Gold');
    await db.updateTable('_pmquotes')
      .set({ quotejson: result })
      .where('pmtype', '=', 'Gold')
      .executeTakeFirst()

    result = await this.fetchService.getAssetQuotes('Silver');
    await db.updateTable('_pmquotes')
      .set({ quotejson: result })
      .where('pmtype', '=', 'Silver')
      .executeTakeFirst()

    for (let assetType of this.commoditiesCryptoNames) {
      result = await this.fetchService.getAssetQuotes(assetType);
      await db.updateTable('_commoditiesothers')
        .set({ quotejson: result })
        .where('commoditytype', '=', assetType)
        .executeTakeFirst()
    }
  }

  @Get('getpq/:assetType')
  async getPMQuotes(@Param('assetType') assetType: string) {
    let result: {};
    if (assetType == 'Gold' || assetType == 'Silver') {
      result = await db.selectFrom('_pmquotes')
        .select('quotejson')
        .where('pmtype', '=', assetType)
        .executeTakeFirst()
    } else {
      result = await db.selectFrom('_commoditiesothers')
        .select('quotejson')
        .where('commoditytype', '=', assetType)
        .executeTakeFirst()
    }
    return result;
  }

  @Get('testpq/:assetType')
  async testCommdQuotes(@Param('assetType') assetType: string) {
    let result: {};
    result = await this.fetchService.getAssetQuotes(assetType);
    return result;
  }

  @Cron('0 */15 * * * *')

  async handleCron() {
    await fetch('http://localhost:3000/updateQuotes');
  }

}
