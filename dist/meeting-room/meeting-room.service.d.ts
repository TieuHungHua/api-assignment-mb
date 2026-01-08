import { PrismaService } from '../prisma/prisma.service';
import { RoomsAvailabilityQueryDto } from './dto/rooms-availability.query.dto';
export declare class MeetingRoomService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRoomsWithAvailability(query: RoomsAvailabilityQueryDto): Promise<{
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
    private buildRoomOrderBy;
    private assertOneHourSlot;
}
