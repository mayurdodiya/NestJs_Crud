import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), BookModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
