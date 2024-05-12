import { IsNotEmpty, IsString } from "class-validator";

export class createLockerDto {

     @IsNotEmpty()
     @IsString()
     title : string;
     
     @IsNotEmpty()
     @IsString()
     description: string;
     

     ownerId ? : string;

     moduleId ? : string;
}