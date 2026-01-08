declare class MeetingBookingUserDto {
    id: string;
    username: string;
    displayName: string;
    role: string;
}
export declare class MeetingBookingResponseDto {
    id: string;
    user: MeetingBookingUserDto;
    tableName: string;
    startAt: Date;
    endAt: Date;
    purpose: string | null;
    attendees: number | null;
    createdAt: Date;
}
export {};
