import { PeopleEntity } from '../../database/entity/People';
import { People } from '../../../common/interfaces/people';

export const peopleCommandRepository = {
    savePeople: async (people: People) => {
        try {
            return await PeopleEntity.create({
                ...people,
                created: new Date(),
                edited: new Date()
            }).save();
        } catch (error) {
            throw { message: `Error saving people with id ${people.id} to database`, error}
        }
    }
}