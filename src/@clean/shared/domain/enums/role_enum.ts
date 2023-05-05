export enum ROLE {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    EMPLOYEE = "EMPLOYEE",
};

export function toEnum(value: string): ROLE {
    switch (value) {
        case "ADMIN":
            return ROLE.ADMIN;
        case "STUDENT":
            return ROLE.STUDENT;
        case "EMPLOYEE":
            return ROLE.EMPLOYEE;
        default:
            throw new Error("Invalid value for enum");
    }
}