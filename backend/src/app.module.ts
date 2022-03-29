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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // change to db if using docker
      port: 5433, // change to 5432 if using docker
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      synchronize: true,
      entities: [Contract, Account],
    }),
    ConfigModule.forRoot(),
    AccountModule,
    ContractModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
