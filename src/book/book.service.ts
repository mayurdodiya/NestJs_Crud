import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const bookD = new Book()
      bookD.title = createBookDto.title;  
      bookD.author = createBookDto.author;
      const data = await this.bookRepository.save(createBookDto) 
      if(data)
      {
        return {success:true,message:'Book created successfully!'};
      }else{
        return 'Book creation failed!';
      }
    } catch (error) {
      console.log(error);  
    }
  }

  async findAll() {
    try {
      const data = await this.bookRepository.find()
      if(data)
      {
        return {success:true,message:'Book data found successfully!', data:data}
      }else{
        return {success:false, message:'Book data not found!'}
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.bookRepository.findOne({where:{id:id}})
      if(data)
        {
          return {success:true,message:'Book data found successfully!', data:data}
        }else{
          return {success:false, message:'Book data not found!'}
        }
    } catch (error) {
      console.log(error); 
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const bookData = await this.bookRepository.findOne({where:{id:id}})
      bookData.title = updateBookDto.title? updateBookDto.title : bookData.title
      bookData.author = updateBookDto.author? updateBookDto.author : bookData.author

      const data = await this.bookRepository.save(bookData)
      if(data)
        {
          return {success:true,message:'Book data update successfully!', data:data}
        }else{
          return {success:false, message:'Book data not found!'}
        }
    } catch (error) {
      console.log(error); 
    }
  }

  async remove(id: number) {
    try {
      const bookData = await this.bookRepository.findOne({where:{id:id}})
      if(!bookData)
      {
        return {success:false, message:'Book data not found!'}
      }

      
      const data = await this.bookRepository.delete(id)
      if(data)
        {
          return {success:true,message:'Book data update successfully!'}
        }else{
          return {success:false, message:'Book data not found!'}
        }
    } catch (error) {
      console.log(error); 
    }
  }
}
