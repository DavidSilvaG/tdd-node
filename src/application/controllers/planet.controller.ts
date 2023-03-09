
import { Request, Response } from 'express';
import { PlanetService } from '../../domain/services/planet.service';
import { responseCodes } from '../../common/interfaces/response';

export const planetsController = {

    getAllPlanets: async (req: Request, res: Response) => {
        const { page } = req.query;
        try {
            const response = await PlanetService.getAllPlanets(page);
            return res.status(response.code).json(response.data || response.message);
        } catch (error) {
            return res.status(responseCodes.INTERNAL_ERROR).json({error});
        }
    },

    getPlanetById: async (req: Request, res: Response) => {
        const { planetId } = req.params;
        try {
            const response = await PlanetService.getPlanetById(planetId);
            return res.status(response.code).json(response.data || response.message);
        } catch (error) {
            return res.status(responseCodes.INTERNAL_ERROR).json({error});
        }
    }

};
