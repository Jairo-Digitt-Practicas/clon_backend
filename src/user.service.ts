import { Injectable } from '@nestjs/common';
import { supabase } from './supabaseClient';
import { CreateUserDto } from './create-user-dto';
import { UpdateUserDTO } from './update-user-dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: createUserDto.name,
          lastName: createUserDto.lastName,
          secondLastName: createUserDto.secondLastName,
          curp: createUserDto.curp,
          email: createUserDto.email,
          phone: createUserDto.phone,
        },
      ])
      .select('*');

    if (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
    return data;
  }
  async updateUser(updateUserDto: UpdateUserDTO, id: string): Promise<any> {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: updateUserDto.name,
        lastName: updateUserDto.lastName,
        secondLastName: updateUserDto.secondLastName,
        curp: updateUserDto.curp,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        id: id,
      })
      .eq('id', updateUserDto.id)
      .select('*');
    if (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
    return data;
  }
}
