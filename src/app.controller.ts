import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiProperty, ApiTags, ApiOperation } from '@nestjs/swagger';

// 1. Định nghĩa DTO (Data Transfer Object)
class CreateItemDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Tên sản phẩm' })
  name: string;

  @ApiProperty({ example: 20000000, description: 'Giá tiền' })
  price: number;
}

// 2. Viết Controller xử lý CRUD
@ApiTags('Items')
@Controller('items')
export class AppController {
  // Database giả lập (lưu trong RAM)
  private items = [
    { id: 1, name: 'Sample Item', price: 100 }
  ];

  @Post()
  @ApiOperation({ summary: 'Tạo mới (Create)' })
  create(@Body() data: CreateItemDto) {
    const newItem = { id: Date.now(), ...data };
    this.items.push(newItem);
    return newItem;
  }

  @Get()
  @ApiOperation({ summary: 'Xem danh sách (Read)' })
  findAll() {
    return this.items;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết (Read One)' })
  findOne(@Param('id') id: string) {
    return this.items.find(item => item.id == Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật (Update)' })
  update(@Param('id') id: string, @Body() data: CreateItemDto) {
    const index = this.items.findIndex(item => item.id == Number(id));
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...data };
      return this.items[index];
    }
    return { message: 'Not found' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa (Delete)' })
  delete(@Param('id') id: string) {
    this.items = this.items.filter(item => item.id != Number(id));
    return { message: 'Deleted' };
  }
}