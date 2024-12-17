import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-south-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.krbvaswyetvzhhxvacfh',
      password: 'type_orm_curd_project',
      database: 'postgres',
      entities: [Book],
      synchronize: true,
    }),
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
