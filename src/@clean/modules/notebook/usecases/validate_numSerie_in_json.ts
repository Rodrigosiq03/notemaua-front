import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';
import { INotebookRepository } from '../domain/repositories/notebook_repository_interface';
import { Notebook } from '@/@clean/shared/domain/entities/notebook';

export class ValidateNumSerieInJsonUsecase {
  constructor(private notebookRepository: INotebookRepository) {}

  execute(numSerie: string): boolean {
    if (!Notebook.validateNumSerie(numSerie)) {
      throw new EntityError('numSerie');
    }
    return this.notebookRepository.validateNumSerieInJson(numSerie);
  }
}
