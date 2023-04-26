import { ROLE } from "../enums/role_enum";
import { EntityError } from "../helpers/errors/domain_error";

export type UserProps = {
    ra: string | null;
    name: string;
    email: string;
    password: string;
    role?: ROLE;
}

export type JsonProps = {
    user_id?: number;
    name: string;
    email: string;
    state?: string;
}

export class User {
    constructor (public props: UserProps) {
        if (!User.validateRa(props.ra)) {
            throw new EntityError('props.ra')
        }
        this.props.ra = props.ra;
        if (!User.validateName(props.name)) {
            throw new EntityError('props.name')
        }
        this.props.name = props.name;
        if (!User.validateEmail(props.email)) {
            throw new EntityError('props.email')
        }
        this.props.email = props.email;
        if (!User.validatePassword(props.password)) {
            throw new EntityError('props.password')
        }
        this.props.password = props.password;

        if (props.role == null) {
            this.props.role = ROLE.STUDENT;
        }
        if (props.role == undefined) {
            this.props.role = ROLE.STUDENT;
        }
        if (typeof props.role != 'string') {
            throw new EntityError('props.role')
        }
        this.props.role = props.role;
        

    }

    get ra() {
        return this.props.ra;
    }

    set setRa(ra: string) {
        if (!User.validateRa(ra)) {
            throw new EntityError('props.ra')
        }
        this.props.ra = ra;
    }

    get password() {
        return this.props.password;
    }

    set setPassword(password: string) {
        if (!User.validatePassword(password)) {
            throw new EntityError('props.password')
        }
        this.props.password = password;
    }

    get name() {
        return this.props.name;
    }

    set setName(name: string) {
        if (!User.validateName(name)) {
            throw new EntityError('props.name')
        }
        this.props.name = name
    }

    get email() {
        return this.props.email;
    }

    set setEmail(email: string) {
        if (!User.validateEmail(email)) {
            throw new EntityError('props.email')
        }
        this.props.email = email
    }

    
    
    // static fromJSON(json: JsonProps) {
    //     return new User({
    //         id: json.user_id,
    //         name: json.name,
    //         email: json.email,
    //         state: toEnum(json.state as string)
    //     })
    // }

    toJSON() {
        return {
            ra: this.props.ra,
            name: this.props.name,
            email: this.props.email,
            role: this.props.role
        }
    }

    // validações abaixo...

    static validateRa(ra: string | null): boolean {
        if (typeof(ra) != "string") {
            return false
        }
        if (ra.length != 10) {
            // CONTANDO O PONTO E O TRAÇO!!
            return false
        } 
        // model of ra is 22.00680-0
        if (ra[2] != "." && ra[8] != "-" ) {
            return false
        }
        return true
    }

    static validateName(name: string): boolean {
        if (name == null) {
            return false
        } 
        if (typeof(name) != "string") {
            return false
        } 
        if (name.length < 3) {
            return false
        }
        return true
    }

    static validateEmail(email: string): boolean {
        const regexp = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

        if (email == null) {
            return false
        }
        if (typeof(email) != "string") {
            return false
        }
        if (!email.match(regexp)) {
            return false
        }
        if (email.includes("maua.br") == false) {
            return false
        }
        return true
    }

    static validateRole(role: ROLE): boolean {
        if (Object.values(ROLE).includes(role) == false) {
            return false
        }
        return true
    }

    static validatePassword(password: string): boolean {
        if (password == null) {
            return false
        } else if (typeof(password) != "string") {
            return false
        } else if (password.length < 8) {
            return false
        }
        return true
    }
}