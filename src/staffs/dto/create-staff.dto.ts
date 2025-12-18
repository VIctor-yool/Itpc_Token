import { IsDateString, IsString, Length } from "class-validator";

export class CreateStaffDto {
    @IsString()
    @Length(1, 255)
    name: string;
    @IsDateString()
    hiredate: string;
}
