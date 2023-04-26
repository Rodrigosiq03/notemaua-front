import { Notebook } from "@/@clean/shared/domain/entities/notebook";
import { EntityError } from "@/@clean/shared/domain/helpers/errors/domain_error";

test('[ENTITY] - Notebook - should create a valid notebook', () => {
    const notebook = new Notebook({
        num_serie: '12345',
        isActive: false
    })
    expect(notebook).toBeInstanceOf(Notebook);
    expect(notebook.num_serie).toBe('12345');
    expect(notebook.isActive).toBe(false);
});
test('[ENTITY] - Notebook - should create a invalid notebook', () => {
    expect(() => {
        new Notebook({
            num_serie: '1234'
        })
    }).toThrowError(EntityError);
    expect(() => {
        new Notebook({
            num_serie: '1234'
        })
    }).toThrowError('Field props.num_serie is not valid');
});
test('[ENTITY] - Notebook - test to json', () => {
    const notebook = new Notebook({
        num_serie: '12345'
    })

    const json = notebook.toJSON();
    expect(json).toBeInstanceOf(Object);
});