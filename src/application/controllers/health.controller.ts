import { Response } from 'express';

export const checkSession = async (req: Request, res: Response): Promise<void> => {
    res.send('alive!');
};
