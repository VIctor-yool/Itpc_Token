import { IsEnum, IsNumber, IsString } from "class-validator";

export enum ComputerStatus {
    GOOD = '양호',
    BROKEN = '고장',
    REPAIRING = '수리중',
}
export class CreateComputerDto {
    @IsString()
    spec: string;
    @IsNumber()
    price: number;
    @IsEnum(ComputerStatus)
    status: ComputerStatus;
}
