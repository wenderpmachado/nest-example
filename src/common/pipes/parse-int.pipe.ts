import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus, BadRequestException } from '@nestjs/common';

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Value supplied is not a valid number');
        }
        return val;
    }
}
