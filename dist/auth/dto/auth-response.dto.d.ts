declare class UserDto {
    id: string;
    username: string;
    displayName: string;
    avatar: string | null;
    role: string;
    email: string | null;
    studentId: string | null;
    classMajor: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
}
export declare class AuthResponseDto {
    access_token: string;
    refresh_token: string;
    user: UserDto;
}
export {};
