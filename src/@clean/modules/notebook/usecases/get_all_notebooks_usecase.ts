import { Withdraw } from '@/@clean/shared/domain/entities/withdraw';
import { Notebook } from '../../../shared/domain/entities/notebook';
import { INotebookRepository } from '../domain/repositories/notebook_repository_interface';

export class GetAllNotebooksUsecase {
  constructor(private notebookRepo: INotebookRepository) {}

  async execute(idToken: string): Promise<[Notebook, Withdraw[]][]> {
    const notebooks = await this.notebookRepo.getAllNotebooks(idToken);
    return notebooks;
  }
}
