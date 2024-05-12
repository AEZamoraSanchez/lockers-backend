import { IsNotEmpty, IsString } from "class-validator";

export class createListDto {
     @IsNotEmpty()
     @IsString()
     title : string;
     
     @IsNotEmpty()
     @IsString()
     description: string;
     
     @IsNotEmpty()
     @IsString()
     ownerId: string;
}