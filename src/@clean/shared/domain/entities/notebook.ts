import { EntityError } from "../helpers/errors/domain_error";

export type NotebookProps = {
    num_serie: string;
    isActive: boolean;
}

export class Notebook {
    constructor(public props: NotebookProps) {
        if (!Notebook.validateNum_serie(props.num_serie)) {
            throw new EntityError('props.num_serie')
        }
        this.props.num_serie = props.num_serie;
        if (!Notebook.validateIsActive(props.isActive)) {
            throw new EntityError('props.isActive')
        }
        this.props.isActive = props.isActive;
        
    }

    get num_serie() {
        return this.props.num_serie;
    }

    set setNum_serie(num_serie: string) {
        if (!Notebook.validateNum_serie(num_serie)) {
            throw new EntityError('props.num_serie')
        }
        this.props.num_serie = num_serie;
    }

    get isActive() {
        return this.props.isActive;
    }

    set setIsActive(isActive: boolean) {
        if (!Notebook.validateIsActive(isActive)) {
            throw new EntityError('props.isActive')
        }
        this.props.isActive = isActive;
    }

    toJSON() {
        return {
            ra: this.props.isActive,
            name: this.props.num_serie,
        }
    }

    static validateNum_serie(num_serie: string): boolean {
        // validate length of num_serie 
        if (num_serie == undefined) {
            return false;
        } 
        if (num_serie == null) {
            return false;
        } 
        if (typeof num_serie != 'string') {
            return false;
        } 
        if (num_serie.length != 5) {
            return false;
        }
        return true;
    }

    static validateIsActive(isActive: boolean): boolean {
        if (isActive == null) {
            return false;
        } else if (isActive == undefined) {
            return false;
        } else if (typeof isActive != 'boolean') {
            return false;
        }
        return true;
    }

}