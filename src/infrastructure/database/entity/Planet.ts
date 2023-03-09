import {
 BaseEntity, Column, Entity, OneToMany, PrimaryColumn
} from 'typeorm';
import { PeopleEntity } from './People';

@Entity('planets')
export class PlanetEntity extends BaseEntity {
    @PrimaryColumn('bigint')
    id: number;

    @Column('varchar', { nullable: false })
    climate: string;

    @Column('varchar', { nullable: false })
    diameter: string;
    
    @Column('varchar', { nullable: false })
    gravity: string;
    
    @Column('varchar', { nullable: false })
    name: string;

    @Column('varchar', { nullable: false })
    population: string;

    @Column('simple-array', { nullable: false })
    residents: string[];

    @Column('varchar', { nullable: false })
    terrain: string;

    @Column('varchar', { nullable: false })
    url: string;

    @OneToMany(() => PeopleEntity, (people) => people.planet)
    people: PeopleEntity[];
}
