import {
 BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn
} from 'typeorm';
import { PlanetEntity } from './Planet';

@Entity('people')
export class PeopleEntity extends BaseEntity {
    @PrimaryColumn('bigint')
    id: number;

    @Column('varchar', { nullable: false })
    name: string;

    @Column('varchar', { nullable: false })
    birth_year: string;

    @Column('varchar', { nullable: false })
    eye_color: string;

    @Column('varchar', { nullable: false })
    gender: string;

    @Column('varchar', { nullable: false })
    hair_color: string;
    
    @Column('varchar', { nullable: false })
    height: string;
    
    @Column('varchar', { nullable: false })
    homeworld: string;

    @Column('varchar', { nullable: false })
    mass: string;

    @Column('varchar', { nullable: false })
    skin_color: string;

    @CreateDateColumn({ nullable: false })
    created: Date;

    @UpdateDateColumn({ nullable: false })
    edited: Date;

    @ManyToOne(() => PlanetEntity, (planet) => planet.people , {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'planet_id', referencedColumnName: 'id' }])
    planet: PlanetEntity;
}
