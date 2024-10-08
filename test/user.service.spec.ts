import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user.service';

const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({
  insert: mockInsert,
}));

jest.mock('../src/supabaseClient', () => ({
  supabase: {
    from: mockFrom,
  },
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('debería crear un usuario', async () => {
    const createUserDto = {
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Smith',
      curp: 'ABC1234567890',
      email: 'john.doe@example.com',
      phone: '1234567890',
      id: '1',
    };

    mockInsert.mockResolvedValue({
      data: [{ id: 1, name: 'John' }],
      error: null,
    });

    const result = await service.createUser(createUserDto);

    expect(result).toEqual([{ id: 1, name: 'John' }]);
    expect(mockFrom).toHaveBeenCalledWith('users');
    expect(mockInsert).toHaveBeenCalledWith([createUserDto]);
  });

  it('debería lanzar un error si Supabase devuelve un error', async () => {
    const createUserDto = {
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Smith',
      curp: 'ABC1234567890',
      email: 'john.doe@example.com',
      phone: '1234567890',
      id: '1',
    };

    mockInsert.mockResolvedValueOnce({
      data: null,
      error: { message: 'Error inserting' },
    });

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      'Error al crear el usuario: Error inserting',
    );
  });
});
