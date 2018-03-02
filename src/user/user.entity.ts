import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @IsInt()
    @ApiModelProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    @IsString()
    @ApiModelProperty({ type: String })
    name: string;

    @Column()
    @IsBoolean()
    @ApiModelProperty({ type: Boolean })
    enabled: boolean;

    constructor(id?: number, name?: string, enabled?: boolean) {
        this.id = id;
        this.name = name;
        this.enabled = enabled;
    }
}
