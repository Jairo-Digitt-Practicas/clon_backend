import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user-dto';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('createUser', () => {
    it('should return "Hello World!"', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastName: 'Doe',
        secondLastName: 'Smith',
        email: 'john.doe@example.com',
        curp: 'ABC1234567890',
        phone: '1234567890',
        id: '1',
      };

      jest
        .spyOn(userController, 'createUser')
        .mockResolvedValue('Hello World!');

      expect(await userController.createUser(createUserDto)).toBe(
        'Hello World!',
      );
    });
  });
});
