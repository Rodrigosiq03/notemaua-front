import { User } from "../../../../../src/@clean/shared/domain/entities/user";
import { ROLE } from "../../../../../src/@clean/shared/domain/enums/role_enum";
import { EntityError } from "../../../../../src/@clean/shared/domain/helpers/errors/domain_error";

test('[ENTITY] - User - Test User entity', () => {
  const user = new User({
    ra: null,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@maua.br',
    password: null,
    role: null
  })
  expect(user).toBeInstanceOf(User);
  expect(user.props.role).toBe(ROLE.STUDENT);
});
test('[ENTITY] - User - Test User entity name', () => {
  const user = new User({
    ra: '22.00680-0',
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@maua.br',
    password: '123456789',
  })
  expect(user.name).toBe('Teste');
});
test('[ENTITY] - User - Test User role default', () => {
  const user = new User({
    ra: '22.00680-0',
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@maua.br',
    password: null,
  })
  expect(user.role).toBe(ROLE.STUDENT);
    
});
test('[ENTITY] - User - Test User entity email', () => {
  const user = new User({
    ra: '22.00680-0',
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@maua.br',
    password: '123456780',
    role: null
  })
  expect(user.email).toBe('rodrigo.dsiqueira1@maua.br');
});
test('[ENTITY] - User - Test User entity error maua email', () => {
  expect(() => {
    new User({
      ra: '22.00680-0',
      name: 'Teste',
      email: 'rodrigo.dsiqueira1@gmail.com',
      password: '123456789',
      role: null
    })
  }).toThrowError(EntityError);
  expect(() => {
    new User({
      ra: '22.00680-0',
      name: 'Teste',
      email: 'rodrigo.dsiqueira1@gmail.com',
      password: '123456789',
      role: null
    })
  }).toThrowError('Field props.email is not valid');
});
test('[ENTITY] - User - Test User entity error email common', () => {
  expect(() => {
    new User({
      ra: '22.00680-0',
      name: 'Teste',
      email: 'rodrigo.dsiqueira1mauabr',
      password: '123456789',
      role: null
    })
  }).toThrowError(EntityError);
  expect(() => {
    new User({
      ra: '22.00680-0',
      name: 'Teste',
      email: 'rodrigo.dsiqueira1mauabr',
      password: '123456789',
      role: null
    })
  }).toThrowError('Field props.email is not valid');
});
