import {IsNotEmpty, IsString} from "class-validator";

export class SlugDto {
    @IsString()
    @IsNotEmpty()
    slug: string;
}
