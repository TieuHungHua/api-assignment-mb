import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingBookingDto } from './dto/create-meeting-booking.dto';
import { MeetingBookingsCriteriaDto } from './dto/meeting-bookings-criteria.dto';
import { UpdateMeetingBookingDto } from './dto/update-meeting-booking.dto';
declare const MEETING_BOOKING_INCLUDE: {
    readonly user: {
        readonly select: {
            readonly id: true;
            readonly username: true;
            readonly displayName: true;
            readonly role: true;
        };
    };
};
type MeetingBookingWithUser = Prisma.MeetingBookingLegacyGetPayload<{
    include: typeof MEETING_BOOKING_INCLUDE;
}>;
export declare class MeetingBookingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private ensureRoleAllowed;
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
