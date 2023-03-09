export interface People {
    id?: number;
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    skin_color: string;
    created?: Date;
    edited?: Date;
    planet?: any;
}

export const RequiredPeopleFields: People = {
    name: "",
    birth_year: "",
    eye_color: "",
    gender: "",
    hair_color: "",
    height: "",
    homeworld: "",
    mass: "",
    skin_color: "",
}