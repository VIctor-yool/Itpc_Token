import { IsNumber } from "class-validator";

export class CreateUsageDto {
    @IsNumber()
    guestId: number;
    @IsNumber()
    computerId: number;
}
