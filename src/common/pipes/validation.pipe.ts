import { PipeTransform, Pipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException(this.concatErrorMessages(errors));
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }

    private concatErrorMessages(errors: ValidationError[]): string {
        let finalMessage: string = '';
        let messageError: string;
        errors.forEach(error => {
            messageError = error.constraints[Object.keys(error.constraints)[0]];
            finalMessage += "'" + messageError.split(' ')[0] + "' " + messageError.substr(messageError.indexOf(" ") + 1) + '. ';
        });
        return finalMessage.slice(0, -1);
    }
}
