import { EntityError } from "../helpers/errors/domain_error";

export type NotebookProps = {
    num_serie: string;
    isActive?: boolean;
}

export type JsonProps = {
    num_serie: string;
    isActive?: boolean;
}

export class Notebook {
    constructor(public props: NotebookProps) {        
        if (!Notebook.validateNum_serie(props.num_serie)) {
            throw new EntityError('props.num_serie')
        }
        this.props.num_serie = props.num_serie;

        if (this.props.isActive == null) {
            this.props.isActive = false;
        } 
        if (this.props.isActive == undefined) {
            this.props.isActive = false;
        } 
        if (typeof props.isActive != 'boolean') {
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
        if (typeof isActive != 'boolean') {
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

    fromJSON(json: JsonProps) {
        return new Notebook({
            num_serie: json.num_serie,
            isActive: json.isActive,
        });
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

}