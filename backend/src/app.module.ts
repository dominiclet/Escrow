import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract/contract.entity';
import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      synchronize: true,
      entities: [Contract, Account],
    }),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
