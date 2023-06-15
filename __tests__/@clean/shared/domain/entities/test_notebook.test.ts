import { Notebook } from '../../../../../src/@clean/shared/domain/entities/notebook';
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error';

test('[ENTITY] - Notebook - should create a valid notebook', () => {
  const notebook = new Notebook({
    numSerie: '12345',
  });
  expect(notebook).toBeInstanceOf(Notebook);
  expect(notebook.numSerie).toBe('12345');
  expect(notebook.isActive).toBe(false);
});

test('[ENTITY] - Notebook - should create a invalid notebook', () => {
  expect(() => {
    new Notebook({
      numSerie: '1234',
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Notebook({
      numSerie: '1234',
    });
  }).toThrowError('Field props.numSerie is not valid');
});
test('[ENTITY] - Notebook - test to json', () => {
  const notebook = new Notebook({
    numSerie: '12345',
  });

  const json = notebook.toJSON();
  expect(json).toBeInstanceOf(Object);
});
test('[ENTITY] - Notebook - test set is active', () => {
  const notebook = new Notebook({
    numSerie: '12345',
  });
  expect(notebook.isActive).toBe(false);
  notebook.setIsActive = true;
  expect(notebook.isActive).toBe(true);
});
