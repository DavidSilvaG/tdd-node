import { PlanetEntity } from '../../database/entity/Planet';

export const planetQueryRepository = {
    getPlanetById: async (id: number) => {
        try {
            return await PlanetEntity.findOne(id);
        } catch (error) {
            throw { message: `Error getting planet with id ${id} from database`, error}
        }
    }
}