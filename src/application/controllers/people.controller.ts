
import { Request, Response } from 'express';
import { PeopleService } from '../../domain/services/people.service';
import { responseCodes } from '../../common/interfaces/response';

export const peopleController = {

    getAllPeople: async (req: Request, res: Response) => {
        const { page } = req.query;
        try {
            const response = await PeopleService.getAllPeople(page);
            return res.status(response.code).json(response.data || response.message);
        } catch (error) {
            return res.status(responseCodes.INTERNAL_ERROR).json({error});
        }
    },

    getPeopleById: async (req: Request, res: Response) => {
        const { peopleId } = req.params;
        try {
            const response = await PeopleService.getPeopleById(peopleId);
            return res.status(response.code).json(response.data || response.message);
        } catch (error) {
            return res.status(responseCodes.INTERNAL_ERROR).json({error});
        }
    },

    registerPeople: async (req: Request, res: Response) => {
        try {
            const response = await PeopleService.registerPeople(req.body);
            return res.status(response.code).json(response.data || response.message);
        } catch (error) {
            return res.status(responseCodes.INTERNAL_ERROR).json({error});
        }
    }

};
