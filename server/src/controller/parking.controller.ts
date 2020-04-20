import { Controller, Get, Query } from "@nestjs/common";
import { ParkingService } from './../service/parking.service';
import { ParkingQuery } from './../dto/parking.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('parking')
@Controller('parking')
export class ParkingController {
    constructor(
        private readonly parkingService: ParkingService
    ) { }

    @Get()
    async getParkings(@Query() query: ParkingQuery) {
        const parking = await this.parkingService.getParkings(query, { limit: query.limit, page: query.page });
        return parking;
    }
}