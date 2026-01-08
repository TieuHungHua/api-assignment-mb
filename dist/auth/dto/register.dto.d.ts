export declare enum RegisterRole {
    student = "student",
    lecturer = "lecturer",
    admin = "admin"
}
export declare class RegisterDto {
    username: string;
    email: string;
    phone: string;
    role: RegisterRole;
    studentId?: string;
    password: string;
    confirmPassword: string;
}
