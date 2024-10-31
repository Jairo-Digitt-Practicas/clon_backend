import { Injectable } from '@nestjs/common';
import { supabase } from './supabaseClient';
import { CreateAuthUserDto, CreateUserDto } from './create-user-dto';
import { UpdateUserDTO, UpdateUserByEmail } from './update-user-dto';

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
      .eq('id', id)
      .select('*');
    if (error) {
      throw new Error(`Error al update del usuario: ${error.message}`);
    }
    return data;
  }
  async createAuthUser(createAuthUserDto: CreateAuthUserDto): Promise<any> {
    // 1. Crear usuario en sopabase
    const { data, error } = await supabase.auth.signUp({
      email: createAuthUserDto.email,
      password: createAuthUserDto.password,
    });
    if (error) {
      throw new Error(`Error al auth el usuario: ${error.message}`);
    }
    // 2. Actualizar user con email y userUUID a db
    await this.updateUUIDByEmail({
      email: createAuthUserDto.email,
      uuid: data.user.id,
    });
  }
  async updateUUIDByEmail(updateData: UpdateUserByEmail): Promise<any> {
    const { data, error } = await supabase
      .from('users')
      .upsert(
        { external_user_id: updateData.uuid, email: updateData.email },
        { onConflict: 'email' },
      );

    if (error) {
      throw new Error(
        `Error al actualizar usuario con email: ${error.message}`,
      );
    }
    console.log(data);
  }

  //crear sign in
}
