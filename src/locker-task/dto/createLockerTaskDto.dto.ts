import { IsNotEmpty, IsString } from "class-validator";

export class createLockerTaskDto {

     @IsNotEmpty()
     @IsString()
     title : string;
     
     @IsNotEmpty()
     @IsString()
     description : string;

     @IsNotEmpty()
     @IsString()
     lockerId : string;
}