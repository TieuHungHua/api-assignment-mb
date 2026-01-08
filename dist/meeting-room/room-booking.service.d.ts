import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingSearchCriteriaDto } from './dto/booking-search.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import type { CurrentUserType } from '../auth/decorators/current-user.decorator';
export declare class RoomBookingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBooking(user: CurrentUserType, dto: CreateBookingDto): Promise<{
        id: string;
        room_id: string;
        user_id: string;
        start_at: string;
        end_at: string;
        purpose: string;
        attendee_count: number;
        status: import("@prisma/client").$Enums.RoomBookingStatus;
        approved_by: string | null;
        approved_at: string | null;
        cancelled_by: string | null;
        cancelled_at: string | null;
        cancel_reason: string | null;
        created_at: string;
        updated_at: string;
        room: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
        };
        user: {
            id: string;
            name: string;
            email: string | null;
            student_code: string | null;
            username: string;
        };
    }>;
    searchBookings(criteria: BookingSearchCriteriaDto, currentUser?: CurrentUserType | null): Promise<{
        items: {
            id: string;
            room_id: string;
            user_id: string;
            start_at: string;
            end_at: string;
            purpose: string;
            attendee_count: number;
            status: import("@prisma/client").$Enums.RoomBookingStatus;
            approved_by: string | null;
            approved_at: string | null;
            cancelled_by: string | null;
            cancelled_at: string | null;
            cancel_reason: string | null;
            created_at: string;
            updated_at: string;
            room: {
                id: string;
                name: string;
                capacity: number;
                image_url: string | null;
                resources: import("@prisma/client").$Enums.RoomResourceType[];
            };
            user: {
                id: string;
                name: string;
                email: string | null;
                student_code: string | null;
                username: string;
            };
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getBookingById(id: string, currentUser?: CurrentUserType | null): Promise<{
        id: string;
        room_id: string;
        user_id: string;
        start_at: string;
        end_at: string;
        purpose: string;
        attendee_count: number;
        status: import("@prisma/client").$Enums.RoomBookingStatus;
        approved_by: string | null;
        approved_at: string | null;
        cancelled_by: string | null;
        cancelled_at: string | null;
        cancel_reason: string | null;
        created_at: string;
        updated_at: string;
        room: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
        };
        user: {
            id: string;
            name: string;
            email: string | null;
            student_code: string | null;
            username: string;
        };
    }>;
    cancelBooking(id: string, currentUser: CurrentUserType, dto: CancelBookingDto): Promise<{
        id: string;
        room_id: string;
        user_id: string;
        start_at: string;
        end_at: string;
        purpose: string;
        attendee_count: number;
        status: import("@prisma/client").$Enums.RoomBookingStatus;
        approved_by: string | null;
        approved_at: string | null;
        cancelled_by: string | null;
        cancelled_at: string | null;
        cancel_reason: string | null;
        created_at: string;
        updated_at: string;
        room: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
        };
        user: {
            id: string;
            name: string;
            email: string | null;
            student_code: string | null;
            username: string;
        };
    }>;
    approveBooking(id: string, currentUser: CurrentUserType): Promise<{
        id: string;
        room_id: string;
        user_id: string;
        start_at: string;
        end_at: string;
        purpose: string;
        attendee_count: number;
        status: import("@prisma/client").$Enums.RoomBookingStatus;
        approved_by: string | null;
        approved_at: string | null;
        cancelled_by: string | null;
        cancelled_at: string | null;
        cancel_reason: string | null;
        created_at: string;
        updated_at: string;
        room: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
        };
        user: {
            id: string;
            name: string;
            email: string | null;
            student_code: string | null;
            username: string;
        };
    }>;
    rejectBooking(id: string, currentUser: CurrentUserType, dto: CancelBookingDto): Promise<{
        id: string;
        room_id: string;
        user_id: string;
        start_at: string;
        end_at: string;
        purpose: string;
        attendee_count: number;
        status: import("@prisma/client").$Enums.RoomBookingStatus;
        approved_by: string | null;
        approved_at: string | null;
        cancelled_by: string | null;
        cancelled_at: string | null;
        cancel_reason: string | null;
        created_at: string;
        updated_at: string;
        room: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
        };
        user: {
            id: string;
            name: string;
            email: string | null;
            student_code: string | null;
            username: string;
        };
    }>;
    private assertKnownRole;
    private assertStaffRole;
    private isOwnerOrStaff;
    private assertOneHourSlot;
    private getDefaultStatus;
    private assertNoConflict;
    private buildBookingWhere;
    private mapFilterField;
    private coerceFilterValue;
    private normalizeStatus;
    private buildFilterCondition;
    private buildBookingOrderBy;
    private mapSortField;
    private formatBooking;
}
