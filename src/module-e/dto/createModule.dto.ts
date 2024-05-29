import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createModuleDto {

     @IsNotEmpty()
     @IsString()
     @MinLength(1)
     @MaxLength(25)  
     title : string;

     @IsNotEmpty()
     @IsString()
     propietario : string;

     ownerId ? : string;

     moduleId ? : string;

     // mainModule ? : string;

}

// 1daa5d63-7a18-4f02-aa11-91d5557e421a