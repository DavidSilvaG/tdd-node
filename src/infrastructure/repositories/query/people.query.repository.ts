import { PeopleEntity } from '../../database/entity/People';


export const peopleQueryRepository = {
    getPeopleById: async (id: number) => {
        try {
            return await PeopleEntity.findOne(id);
        } catch (error) {
            throw { message: `Error getting people with id ${id} from database`, error}
        }
    },

    getHighestId: async () => {
        try {
            const max = await PeopleEntity.createQueryBuilder('people').select('MAX(people.id)','value').getRawOne();
            return Number(max.value)
        } catch (error) {
            throw { message: `Error getting max id of people at database`, error}
        }
    }
}