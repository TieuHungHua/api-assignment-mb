import { type CurrentUserType } from '../auth/decorators/current-user.decorator';
import { RoomBookingService } from './room-booking.service';
import { BookingSearchCriteriaDto } from './dto/booking-search.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
export declare class RoomBookingAdminController {
    private readonly roomBookingService;
    constructor(roomBookingService: RoomBookingService);
    searchBookings(criteria: BookingSearchCriteriaDto, currentUser: CurrentUserType): Promise<{
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
    approve(id: string, currentUser: CurrentUserType): Promise<{
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
    reject(id: string, dto: CancelBookingDto, currentUser: CurrentUserType): Promise<{
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
    private assertStaff;
}
