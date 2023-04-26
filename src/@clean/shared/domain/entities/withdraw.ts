import { EntityError } from "../helpers/errors/domain_error";

export type WithdrawProps = {
    num_serie: string;
    email: string;
    withdraw_time: number;
    finish_time: number | null;
}

export class Withdraw {
    constructor(public props: WithdrawProps) {
        if (!Withdraw.validateNum_serie(props.num_serie)) {
            throw new EntityError('props.num_serie')
        }
        this.props.num_serie = props.num_serie;
        if (!Withdraw.validateEmail(props.email)) {
            throw new EntityError('props.email')
        }
        this.props.email = props.email;
        if (!Withdraw.validateWithdraw_time(props.withdraw_time)) {
            throw new EntityError('props.withdraw_time')
        }
        this.props.withdraw_time = props.withdraw_time;
        if (props.finish_time != null) {
            if (!Withdraw.validateFinish_time(props.finish_time)) {
                throw new EntityError('props.finish_time')
            }
            this.props.finish_time = props.finish_time;
        }
    }

    get num_serie() {
        return this.props.num_serie;
    }

    set setNum_serie(num_serie: string) {
        if (!Withdraw.validateNum_serie(num_serie)) {
            throw new EntityError('props.num_serie')
        }
        this.props.num_serie = num_serie;
    }

    get email() {
        return this.props.email;
    }

    set setEmail(email: string) {
        if (!Withdraw.validateEmail(email)) {
            throw new EntityError('props.email')
        }
        this.props.email = email;
    }

    get withdraw_time() {
        return this.props.withdraw_time;
    }

    set setWithdraw_time(withdraw_time: number) {
        if (!Withdraw.validateWithdraw_time(withdraw_time)) {
            throw new EntityError('props.withdraw_time')
        }
        this.props.withdraw_time = withdraw_time;
    }

    get finish_time() {
        return this.props.finish_time;
    }

    set setFinish_time(finish_time: number | null) {
        if (finish_time != null) {
            if (!Withdraw.validateFinish_time(finish_time)) {
                throw new EntityError('props.finish_time')
            }
            this.props.finish_time = finish_time;
        }
    }

    toJSON() {
        return {
            num_serie: this.props.num_serie,
            email: this.props.email,
            withdraw_time: this.props.withdraw_time,
            finish_time: this.props.finish_time,
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

    static validateWithdraw_time(withdraw_time: number): boolean {
        if (withdraw_time == null) {
            return false
        }
        if (typeof(withdraw_time) != "number") {
            return false
        }
        if (withdraw_time < 0) {
            return false
        }
        return true
    }

    static validateFinish_time(finish_time: number): boolean {
        if (finish_time == null) {
            return false
        }
        if (typeof(finish_time) != "number") {
            return false
        }
        if (finish_time < 0) {
            return false
        }
        return true
    }


}