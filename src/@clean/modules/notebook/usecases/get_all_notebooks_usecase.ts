import { Notebook } from '../../../shared/domain/entities/notebook';
import { INotebookRepository } from '../domain/repositories/notebook_repository_interface';

export class GetNotebookUsecase {
  constructor(private notebookRepo: INotebookRepository) {}

  async execute(): Promise<Notebook[]> {
    const notebooks = await this.notebookRepo.getAllNotebooks();
    return notebooks;
  }
}
