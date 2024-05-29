import { IsNotEmpty, IsString } from "class-validator";

export class createLockerDto {

     @IsNotEmpty()
     @IsString()
     title : string;
     
     @IsNotEmpty()
     @IsString()
     description: string;

     @IsNotEmpty()
     @IsString()
     propietario: string;

     ownerId ? : string;

     moduleId ? : string;
}