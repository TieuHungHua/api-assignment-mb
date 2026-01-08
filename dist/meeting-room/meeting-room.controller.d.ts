import { MeetingRoomService } from './meeting-room.service';
import { RoomsAvailabilityQueryDto } from './dto/rooms-availability.query.dto';
export declare class MeetingRoomController {
    private readonly meetingRoomService;
    constructor(meetingRoomService: MeetingRoomService);
    getRooms(query: RoomsAvailabilityQueryDto): Promise<{
        items: {
            id: string;
            name: string;
            capacity: number;
            image_url: string | null;
            resources: import("@prisma/client").$Enums.RoomResourceType[];
            availability: {
                is_available: boolean;
            };
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
}
