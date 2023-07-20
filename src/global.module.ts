
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            provide: 'commoditiesCryptoNames',
            useValue: ['BitCoin', 'Eth', 'Ada', 'Dot', 'Lnk', 'Vet', 'Sol', 'Ava', 'Ura', 'Sus', 'Alg', 'CrudeOil', 'USD'],
        },
        {
            provide: 'commoditiesCryptoFetachNames',
            useValue: ['BTC-USD', 'ETH-USD', 'ADA-USD', 'DOT-USD', 'LINK-USD', 'VET-USD', 'SOL-USD', 'AVAX-USD', 'URA', 'SUSHI-USD', 'ALGO-USD', 'CL=F', 'DX=F'],
        }
    ],
    exports: ['commoditiesCryptoNames', 'commoditiesCryptoFetachNames'],
})
export class GlobalModule { }