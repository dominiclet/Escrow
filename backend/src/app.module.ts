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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // docker:db, local: localhost
      port: 5432, // docker: 5432, local: depends on your system (5433)
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      synchronize: true,
      entities: [Contract, Account],
    }),
    ConfigModule.forRoot(),
    SeederModule,
    AccountModule,
    ContractModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
