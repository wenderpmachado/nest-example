import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, IsBoolean } from 'class-validator';

@Entity()
export class User {
    /**
     * If use Typeorm with Mongo, change for it:
     *
     * @ObjectIdColumn()
     * id: ObjectID;
     */

    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column({ length: 255 })
    @IsString()
    name: string;

    @Column()
    @IsBoolean()
    enabled: boolean;
}
