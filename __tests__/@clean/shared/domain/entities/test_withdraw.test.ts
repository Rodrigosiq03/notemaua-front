import { Withdraw } from "@/@clean/modules/domain/entities/withdraw";
import { EntityError } from "@/@clean/modules/domain/helpers/errors/domain_error";

test('[ENTITY] - Withdraw - should create a valid withdraw', () => {
    const withdraw = new Withdraw({
        num_serie: '12345',
        email: 'rodrigo.dsiqueira1@maua.br',
        withdraw_time: 1,
        finish_time: 2
    })
    expect(withdraw).toBeInstanceOf(Withdraw);
    expect(withdraw.num_serie).toBe('12345');
    expect(withdraw.email).toBe('rodrigo.dsiqueira1@maua.br');
    expect(withdraw.withdraw_time).toBe(1);
    expect(withdraw.finish_time).toBe(2);
});
test('[ENTITY] - Withdraw - should create a withdraw with invalid num_serie ', () => {
    expect(() => {
        new Withdraw({
            num_serie: '1234',
            email: 'rodrigo.dsiqueira1@maua.br',
            withdraw_time: 1,
            finish_time: 2
        })
    }).toThrowError('Field props.num_serie is not valid');

    expect(() => {
        new Withdraw({
            num_serie: '1234',
            email: 'rodrigo.dsiqueira1@maua.br',
            withdraw_time: 1,
            finish_time: 2
        })
    }).toThrowError(EntityError);
});
test('[ENTITY] - Withdraw - to json', () => {
    const withdraw = new Withdraw({
        num_serie: '12345',
        email: 'rodrigo.dsiqueira1@maua.br',
        withdraw_time: 1,
        finish_time: 2
    });

    const json = withdraw.toJSON();
    expect(json).toBeInstanceOf(Object);
});
