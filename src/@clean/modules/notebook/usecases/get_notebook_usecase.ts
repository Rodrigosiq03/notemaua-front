import { Notebook } from "../../../shared/domain/entities/notebook";
import { INotebookRepository } from "../domain/repositories/notebook_repository_interface";
import { EntityError } from "../../../shared/domain/helpers/errors/domain_error";

export class GetNotebookUsecase {
  constructor(private notebookRepo: INotebookRepository) {}

  async execute(numSerie: string): Promise<Notebook> {
    if (!Notebook.validateNumSerie(numSerie)) {
      throw new EntityError("numSerie");
    }
    const notebook = await this.notebookRepo.getNotebook(numSerie);
    return notebook;
  }
}
