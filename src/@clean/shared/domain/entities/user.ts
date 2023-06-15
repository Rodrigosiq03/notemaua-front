import { ROLE } from '../enums/role_enum';
import { EntityError } from '../helpers/errors/domain_error';

export type UserProps = {
  ra: string | null;
  name: string;
  email: string;
  password: string | null;
  role?: ROLE | null;
};

export class User {
  constructor(
    public props: UserProps = {
      ra: null,
      name: '',
      email: '',
      password: null,
      role: ROLE.STUDENT,
    }
  ) {
    if (!User.validateRa(props.ra)) {
      throw new EntityError('props.ra');
    }
    if (this.props.ra != null) {
      props.role = ROLE.STUDENT;
    }
    this.props.ra = props.ra;
    if (!User.validateName(props.name)) {
      throw new EntityError('props.name');
    }
    this.props.name = props.name;
    if (!User.validateEmail(props.email)) {
      throw new EntityError('props.email');
    }
    this.props.email = props.email;
    if (!User.validatePassword(props.password)) {
      throw new EntityError('props.password');
    }
    this.props.password = props.password;
    if (props.role == null) {
      this.props.role = ROLE.STUDENT;
    }
    if (typeof props.role !== 'string') {
      throw new EntityError('props.role');
    }
    this.props.role = props.role;
  }

  get ra() {
    return this.props.ra;
  }

  set setRa(ra: string) {
    if (!User.validateRa(ra)) {
      throw new EntityError('props.ra');
    }
    this.props.ra = ra;
  }

  get password() {
    return this.props.password;
  }

  set setPassword(password: string) {
    if (!User.validatePassword(password)) {
      throw new EntityError('props.password');
    }
    this.props.password = password;
  }

  get name() {
    return this.props.name;
  }

  set setName(name: string) {
    if (!User.validateName(name)) {
      throw new EntityError('props.name');
    }
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set setEmail(email: string) {
    if (!User.validateEmail(email)) {
      throw new EntityError('props.email');
    }
    this.props.email = email;
  }

  get role() {
    return this.props.role;
  }

  set setRole(role: ROLE) {
    if (typeof role !== 'string') {
      throw new EntityError('props.role');
    }
    this.props.role = role;
  }

  static validateRa(ra: string | null): boolean {
    if (ra != null) {
      if (typeof ra !== 'string') {
        return false;
      }
      if (ra.length != 10) {
        return false;
      }
      if (ra[2] != '.' && ra[8] != '-') {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false;
    }
    if (typeof name !== 'string') {
      return false;
    }
    if (name.length < 3) {
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

  static validateRole(role: ROLE): boolean {
    if (Object.values(ROLE).includes(role) == false) {
      return false;
    }
    return true;
  }

  static validatePassword(password: string | null): boolean {
    if (password != null) {
      if (password == null) {
        return false;
      }
      if (typeof password !== 'string') {
        return false;
      }
      if (password.length <= 7) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
}
