import { IsString, IsInt, IsBoolean, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Project {
    @IsInt()
    @ApiModelProperty({ type: Number })
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ length: 255 })
    @IsString()
    @ApiModelProperty({ type: String })
    name: string;

    @Column({ length: 255 })
    @IsString()
    @ApiModelProperty({ type: String })
    description: string;

    // @Column(type => User)
    // @IsArray()
    // @ApiModelProperty({ type: Array })
    // members: User[];

    // constructor(id?: ObjectID, name?: string, description?: string/*, members?: User[]*/) {
    //     this.id = id;
    //     this.name = name;
    //     this.description = description;
    //     // this.members = members;
    // }
}
