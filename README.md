<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A REST API built with <a href="https://nestjs.com/">NestJS</a> and <a href="https://kysely.dev/">Kysely SQL Query Builder</a>. 
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This [NestJS](https://nestjs.com/) application will scrape data from websites and updates price information for Gold, Silver, Crude Oil, Uranium, US Dollar, Bitcoin, Ethereum, Cardano, Polkadot, Chainlink, Vechain, Solana, Avalanche and Algorand (in 15 minutes interval) to a backend PostgresSQL database.

The JSON data in the database table is accessible through REST API which can be ingested by third party application such as [KWGT Kustom Widget Maker](https://play.google.com/store/apps/details?id=org.kustom.widget&hl=en&gl=US) running on Android OS.

This application can be deployed as Docker container on any supporting platforms. 
The included "Dockerfile" and "compose.yaml" are used to deploy the application on Synology NAS.

The SQL requires to create the backend tables are included in the "migration.sql" file.

You can add/remove the list of commodities and cryptos through the array lists inside the "src\global.module.ts" file.

## API Endpoints
```
/updateQuotes - scrape and update latest price information for all supported commodities and cryptos
/getpq/[assetType] - get price information for [assetType] from backend Postgres database
/testpq/[assetType] - scrape and update latest price information for [assetType]
```
Note: Price information for all commodities and cryptos will be updated at every 15 minutes interval.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Shan](https://sg.linkedin.com/in/khim-shan-yap-103213106)
- Website - [Bitcoin Money](https://www.bitcoinmoney.network/)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
