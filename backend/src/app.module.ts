import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract/contract.entity';
import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL, 
      type: 'postgres',
      database: 'db',
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: false,
      entities: [Contract, Account],
      autoLoadEntities: true,
    }),
    AccountModule,
    ContractModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
