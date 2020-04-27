import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParkingService } from './../service/parking.service';
import { ParkingQuery } from './../dto/parking.dto';

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

    @Get(':id')
    async getOne(@Param('id') id: number) {
        const parking = await this.parkingService.getById(+id);
        return parking;
    }
}