import { User } from "@/@clean/shared/domain/entities/user";
import { ROLE } from "@/@clean/shared/domain/enums/role_enum";
import { EntityError } from "@/@clean/shared/domain/helpers/errors/domain_error";

test('[ENTITY] - User - Test User entity', () => {
    const user = new User({
        ra: '22.00680-0',
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@maua.br',
        password: '12345678'
    })
    expect(user).toBeInstanceOf(User);
});
test('[ENTITY] - User - Test User entity name', () => {
    const user = new User({
        ra: '22.00680-0',
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@maua.br',
        password: '12345678'
    })
    expect(user.name).toBe('Teste');
});
test('[ENTITY] - User - Test User role default', () => {
    const user = new User({
        ra: '22.00680-0',
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@maua.br',
        password: '12345678',
        role: ROLE.STUDENT
    })
    expect(user.props.role).toBe(ROLE.STUDENT);
    
});
test('[ENTITY] - User - Test User entity email', () => {
    const user = new User({
        ra: '22.00680-0',
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@maua.br',
        password: '12345678'
    })
    expect(user.email).toBe('rodrigo.dsiqueira1@maua.br');
});
test('[ENTITY] - User - Test User entity error maua email', () => {
    expect(() => {
        new User({
            ra: '22.00680-0',
            name: 'Teste',
            email: 'rodrigo.dsiqueira1@gmail.com',
            password: '12345678'
        })
    }).toThrowError(EntityError);
    expect(() => {
        new User({
            ra: '22.00680-0',
            name: 'Teste',
            email: 'rodrigo.dsiqueira1@gmail.com',
            password: '12345678'
        })
    }).toThrowError('Field props.email is not valid');
});
test('[ENTITY] - User - Test User entity error email common', () => {
    expect(() => {
        new User({
            ra: '22.00680-0',
            name: 'Teste',
            email: 'rodrigo.dsiqueira1mauabr',
            password: '12345678'
        })
    }).toThrowError(EntityError);
    expect(() => {
        new User({
            ra: '22.00680-0',
            name: 'Teste',
            email: 'rodrigo.dsiqueira1mauabr',
            password: '12345678'
        })
    }).toThrowError('Field props.email is not valid');
});
test('[ENTITY] - User - Test to json', () => {
    const user = new User({
        ra: '22.00680-0',
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@maua.br',
        password: '12345678'
    })

    const userToJSON = user.toJSON();

    expect(userToJSON).toBeInstanceOf(Object);
});
