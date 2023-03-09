import { validationErrors } from "../../common/interfaces/messages";
import { responseCodes, responseObject } from "../../common/interfaces/response";
import { SwapiAgent } from "../../infrastructure/agents/swapi.agent";
import { planetQueryRepository } from "../../infrastructure/repositories/query/planet.query.repository";
import { planetCommandRepository } from "../../infrastructure/repositories/command/planet.command.repository";

export const PlanetService = {

    getAllPlanets : async (page: any) : Promise<responseObject>=> {
        const pageNumber = Number(page);
        if(pageNumber <= 0  || isNaN(pageNumber)) {
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.onlyPositiveIntegerAllowed('page',page)
            }
        }
        const planets = await SwapiAgent.getAllPlanetsByPage(pageNumber);
        return {
            code: responseCodes.OK,
            data: {
                count: planets.length,
                planets
            } 
        }
    },

    getPlanetById : async (id: any) : Promise<responseObject>=> {
        const planetId = Number(id);
        if(planetId <= 0  || isNaN(planetId)) {
            return { 
                code: responseCodes.BAD_REQUEST, 
                message: validationErrors.onlyPositiveIntegerAllowed('planetId',id)
            }
        }
        let planet = await planetQueryRepository.getPlanetById(planetId)
        if(!planet){
            const swapiPlanet = await SwapiAgent.getPlanetById(planetId)
            planet = await planetCommandRepository.savePlanet({...swapiPlanet, id:planetId})
        }
        return {
            code: responseCodes.OK,
            data: planet
        }
    }
    
};