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
     propietario: string;
     
     ownerId ? : string;

     moduleId ? : string;
}