import { Withdraw } from "@/@clean/shared/domain/entities/withdraw";
import { EntityError } from "@/@clean/shared/domain/helpers/errors/domain_error";

test('[ENTITY] - Withdraw - should create a valid withdraw', () => {
    const withdraw = new Withdraw({
        numSerie: '12345',
        email: 'rodrigo.dsiqueira1@maua.br',
        withdrawTime: 1672585200001,
        finishTime: 1672585200002
    })
    expect(withdraw).toBeInstanceOf(Withdraw);
    expect(withdraw.num_serie).toBe('12345');
    expect(withdraw.email).toBe('rodrigo.dsiqueira1@maua.br');
    expect(withdraw.withdraw_time).toBe(1672585200001);
    expect(withdraw.finish_time).toBe(1672585200002);
});
test('[ENTITY] - Withdraw - should create a withdraw with invalid num_serie ', () => {
    expect(() => {
        new Withdraw({
            numSerie: '1234',
            email: 'rodrigo.dsiqueira1@maua.br',
            withdrawTime: 1672585200001,
            finishTime: 1672585200002
        })
    }).toThrowError('Field props.num_serie is not valid');

    expect(() => {
        new Withdraw({
            numSerie: '1234',
            email: 'rodrigo.dsiqueira1@maua.br',
            withdrawTime: 1672585200001,
            finishTime: 1672585200002
        })
    }).toThrowError(EntityError);
});
test('[ENTITY] - Withdraw - to json', () => {
    const withdraw = new Withdraw({
        numSerie: '12345',
        email: 'rodrigo.dsiqueira1@maua.br',
        withdrawTime: 1672585200001,
        finishTime: 1672585200002
    });

    const json = withdraw.toJSON();
    expect(json).toBeInstanceOf(Object);
});
test('[ENTITY] - Withdraw - from Json', () => {
    const withdraw = Withdraw.fromJSON({
        num_serie: '12345',
        email: 'rodrigo.dsiqueira1@maua.br',
        withdraw_time: 1672585200001,
        finish_time: 1672585200002
    });

    expect(withdraw).toBeInstanceOf(Withdraw);
})
