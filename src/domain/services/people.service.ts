import { peopleQueryRepository } from "../../infrastructure/repositories/query/people.query.repository";
import { validationErrors } from "../../common/interfaces/messages";
import { responseCodes, responseObject } from "../../common/interfaces/response";
import { SwapiAgent } from "../../infrastructure/agents/swapi.agent";
import { peopleCommandRepository } from "../../infrastructure/repositories/command/people.command.repository";
import { getIdFromSwapiUrl, isValidHomeworld } from "../../common/utils/helpers";
import { PlanetService } from "./planet.service";
import { People, RequiredPeopleFields } from "../../common/interfaces/people";

const peopleFields = Object.keys(RequiredPeopleFields);

export const PeopleService = {

    getAllPeople : async (page: any) : Promise<responseObject> => {
        const pageNumber = Number(page);
        if(pageNumber <= 0  || isNaN(pageNumber)) {
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.onlyPositiveIntegerAllowed('page',page)
            }
        }
        const people = await SwapiAgent.getAllPeopleByPage(pageNumber);
        return {
            code: responseCodes.OK,
            data: {
                count: people.length,
                people
            } 
        }
    },

    getPeopleById : async (id: any) : Promise<responseObject> => {
        const peopleId = Number(id);
        if(peopleId <= 0  || isNaN(peopleId)) {
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.onlyPositiveIntegerAllowed('peopleId',id)
            }
        }
        let people = await peopleQueryRepository.getPeopleById(peopleId)
        if(!people){
            const swapiPeople = await SwapiAgent.getPeopleById(peopleId);
            const planetId = getIdFromSwapiUrl(swapiPeople.homeworld);
            await PlanetService.getPlanetById(planetId);
            people = await peopleCommandRepository.savePeople({...swapiPeople, id:peopleId, planet: planetId});
        }
        return {
            code: responseCodes.OK,
            data: people
        }
    },

    registerPeople : async (people: People) : Promise<responseObject> => {
        const receivedKeys = Object.keys(people);
        const missingKeys = peopleFields.filter(key => !receivedKeys.includes(key));
        if(missingKeys.length){
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.keysRequired(missingKeys)
            }
        }
        if(Object.values(people).some(value => typeof value !== 'string')){
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.onlyStringAllowed
            }
        }
        if(!isValidHomeworld(people.homeworld)){
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.invalidHomeWorld
            }
        }
        const planetId = getIdFromSwapiUrl(people.homeworld);
        await PlanetService.getPlanetById(planetId);
        people.id = await PeopleService.generateIdForNewPeople();
        const peopleRegistered = await peopleCommandRepository.savePeople({...people, planet: planetId});
        return {
            code: responseCodes.OK,
            data: peopleRegistered
        }
    },

    generateIdForNewPeople: async ()=>{
        const maxIdAtDb = await peopleQueryRepository.getHighestId();
        return maxIdAtDb > 10000 ? maxIdAtDb + 1 : 10001;
    }

};