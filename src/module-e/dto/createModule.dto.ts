import { IsNotEmpty, IsString } from "class-validator";

export class createModuleDto {

     @IsNotEmpty()
     @IsString()
     title : string;

     ownerId ? : string;

     moduleId ? : string;
}

// 1daa5d63-7a18-4f02-aa11-91d5557e421a