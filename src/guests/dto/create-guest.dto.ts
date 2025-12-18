import { IsNumber, IsString } from "class-validator";

export class CreateGuestDto {
    @IsString()
    name: string;
    @IsString()
    password: string;
    @IsNumber()
    age: number;
}
