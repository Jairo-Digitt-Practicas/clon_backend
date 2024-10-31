export class UpdateUserDTO {
  readonly name?: string;
  readonly lastName?: string;
  readonly secondLastName?: string;
  readonly curp?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly id: string;
}

export class UpdateUserByEmail {
  readonly name?: string;
  readonly lastName?: string;
  readonly secondLastName?: string;
  readonly curp?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly id?: string;
  readonly uuid: string;
}
