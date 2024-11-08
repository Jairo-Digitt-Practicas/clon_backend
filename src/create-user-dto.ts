export class CreateUserDto {
  readonly name: string;
  readonly lastName: string;
  readonly secondLastName: string;
  readonly curp: string;
  readonly email: string;
  readonly phone: string;
  readonly id: string;
}

export class CreateAuthUserDto {
  readonly email: string;
  readonly password: string;
}
