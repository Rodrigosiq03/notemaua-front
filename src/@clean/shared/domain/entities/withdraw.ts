import { EntityError } from '../helpers/errors/domain_error';

export type WithdrawProps = {
  numSerie: string;
  email: string;
  withdrawTime: number;
  finishTime: number | null;
};

export type WithdrawJson = {
  num_serie: string;
  email: string;
  withdraw_time: number;
  finish_time: number | null;
};

export class Withdraw {
  constructor(public props: WithdrawProps) {
    if (!Withdraw.validateNumSerie(props.numSerie)) {
      throw new EntityError('props.num_serie');
    }
    this.props.numSerie = props.numSerie;
    if (!Withdraw.validateEmail(props.email)) {
      throw new EntityError('props.email');
    }
    this.props.email = props.email;
    if (!Withdraw.validateWithdraw_time(props.withdrawTime)) {
      throw new EntityError('props.withdraw_time');
    }
    this.props.withdrawTime = props.withdrawTime;
    if (props.finishTime != null) {
      if (!Withdraw.validateFinish_time(props.finishTime)) {
        throw new EntityError('props.finish_time');
      }
      this.props.finishTime = props.finishTime;
    }
  }

  get numSerie() {
    return this.props.numSerie;
  }

  set setNumSerie(numSerie: string) {
    if (!Withdraw.validateNumSerie(numSerie)) {
      throw new EntityError('props.numSerie');
    }
    this.props.numSerie = numSerie;
  }

  get email() {
    return this.props.email;
  }

  set setEmail(email: string) {
    if (!Withdraw.validateEmail(email)) {
      throw new EntityError('props.email');
    }
    this.props.email = email;
  }

  get withdrawTime() {
    return this.props.withdrawTime;
  }

  set setWithdrawTime(withdrawTime: number) {
    if (!Withdraw.validateWithdraw_time(withdrawTime)) {
      throw new EntityError('props.withdrawTime');
    }
    this.props.withdrawTime = withdrawTime;
  }

  get finishTime() {
    return this.props.finishTime;
  }

  set setFinishTime(finishTime: number | null) {
    if (finishTime != null) {
      if (!Withdraw.validateFinish_time(finishTime)) {
        throw new EntityError('props.finishTime');
      }
      this.props.finishTime = finishTime;
    }
  }

  toJSON() {
    return {
      num_serie: this.props.numSerie,
      email: this.props.email,
      withdraw_time: this.props.withdrawTime,
      finish_time: this.props.finishTime,
    };
  }

  static fromJSON(json: WithdrawJson) {
    return new Withdraw({
      numSerie: json.num_serie,
      email: json.email,
      withdrawTime: json.withdraw_time,
      finishTime: json.finish_time,
    });
  }

  static validateNumSerie(num_serie: string): boolean {
    // validate length of num_serie
    if (num_serie == undefined) {
      return false;
    }
    if (num_serie == null) {
      return false;
    }
    if (typeof num_serie !== 'string') {
      return false;
    }
    if (num_serie.length != 5) {
      return false;
    }
    return true;
  }

  static validateEmail(email: string): boolean {
    const regexp = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)';

    if (email == null) {
      return false;
    }
    if (typeof email !== 'string') {
      return false;
    }
    if (!email.match(regexp)) {
      return false;
    }
    if (email.substring(email.length - 8, email.length) != '@maua.br') {
      return false;
    }
    return true;
  }

  static validateWithdraw_time(withdraw_time: number): boolean {
    if (withdraw_time == null) {
      return false;
    }
    if (typeof withdraw_time !== 'number') {
      return false;
    }
    // 1672585200000 = Janeiro de 2023, dia 01.
    if (withdraw_time < 1672585200000) {
      return false;
    }
    return true;
  }

  static validateFinish_time(finish_time: number): boolean {
    if (finish_time == null) {
      return false;
    }
    if (typeof finish_time !== 'number') {
      return false;
    }
    if (finish_time < 1672585200000) {
      return false;
    }
    return true;
  }
}
