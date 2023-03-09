import { Planet } from '../../../common/interfaces/planet';
import { PlanetEntity } from '../../database/entity/Planet';


export const planetCommandRepository = {
    savePlanet: async (planet: Planet) => {
        try {
            return await PlanetEntity.create(planet).save();
        } catch (error) {
            throw { message: `Error saving planet with id ${planet.id} to database`, error}
        }
    }
}