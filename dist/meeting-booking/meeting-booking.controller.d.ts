import { MeetingBookingService } from './meeting-booking.service';
import { CreateMeetingBookingDto } from './dto/create-meeting-booking.dto';
import { MeetingBookingsCriteriaDto } from './dto/meeting-bookings-criteria.dto';
import { UpdateMeetingBookingDto } from './dto/update-meeting-booking.dto';
import { Prisma } from '@prisma/client';
type MeetingBookingWithUser = Prisma.MeetingBookingLegacyGetPayload<{
    include: {
        user: {
            select: {
                id: true;
                username: true;
                displayName: true;
                role: true;
            };
        };
    };
}>;
export declare class MeetingBookingController {
    private readonly meetingBookingService;
    constructor(meetingBookingService: MeetingBookingService);
    create(createMeetingBookingDto: CreateMeetingBookingDto): Promise<MeetingBookingWithUser>;
    findAll(criteria: MeetingBookingsCriteriaDto): Promise<{
        data: MeetingBookingWithUser[];
        criteria: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<MeetingBookingWithUser>;
    update(id: string, updateMeetingBookingDto: UpdateMeetingBookingDto): Promise<MeetingBookingWithUser>;
    remove(id: string, userId: string): Promise<MeetingBookingWithUser>;
}
export {};
