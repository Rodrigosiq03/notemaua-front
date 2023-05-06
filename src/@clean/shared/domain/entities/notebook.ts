import { EntityError } from "../helpers/errors/domain_error";

export type NotebookProps = {
  numSerie: string;
  isActive?: boolean;
};

export type JsonProps = {
  num_serie: string;
  isActive?: boolean;
};

// if (!Notebook.validateNum_serie(props.numSerie)) {
//     throw new EntityError('props.num_serie')
// }
// this.props.numSerie = props.numSerie;

export class Notebook {
  constructor(public props: NotebookProps) {
    if (this.props.isActive == null) {
      this.props.isActive = false;
    }
    if (this.props.isActive == undefined) {
      this.props.isActive = false;
    }
    if (typeof props.isActive != "boolean") {
      throw new EntityError("props.isActive");
    }
    this.props.isActive = props.isActive;
    if (!Notebook.validateNumSerie(props.numSerie)) {
      throw new EntityError("props.numSerie");
    }
  }

  get numSerie() {
    return this.props.numSerie;
  }

  set setNumSerie(numSerie: string) {
    if (!Notebook.validateNumSerie(numSerie)) {
      throw new EntityError("props.num_serie");
    }
    this.props.numSerie = numSerie;
  }

  get isActive() {
    return this.props.isActive;
  }

  set setIsActive(isActive: boolean) {
    if (typeof isActive != "boolean") {
      throw new EntityError("props.isActive");
    }
    this.props.isActive = isActive;
  }

  setNotebookIsActive(numSerie: string) {
    if (!Notebook.validateNumSerie(numSerie)) {
      throw new EntityError("props.numSerie");
    }
    this.props.numSerie = numSerie;
    this.props.isActive = true;
  }

  toJSON() {
    return {
      ra: this.props.isActive,
      name: this.props.numSerie,
    };
  }

  fromJSON(json: JsonProps) {
    return new Notebook({
      numSerie: json.num_serie,
      isActive: json.isActive,
    });
  }

  static validateNumSerie(numSerie: string): boolean {
    // validate length of num_serie
    if (numSerie == undefined) {
      return false;
    }
    if (numSerie == null) {
      return false;
    }
    if (typeof numSerie != "string") {
      return false;
    }
    if (numSerie.length != 5) {
      return false;
    }
    return true;
  }
}
