import { IsNotEmpty, IsString } from "class-validator";

export class createListTaskDto {

     @IsNotEmpty()
     @IsString()
     title : string;

     @IsNotEmpty()
     @IsString()
     listId : string;
}