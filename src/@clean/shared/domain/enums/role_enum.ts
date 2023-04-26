export enum ROLE {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
};

export function toEnum(value: string): ROLE {
    switch (value) {
        case "ADMIN":
            return ROLE.ADMIN;
        case "STUDENT":
            return ROLE.STUDENT;
        default:
            throw new Error("Invalid value for enum");
    }
}