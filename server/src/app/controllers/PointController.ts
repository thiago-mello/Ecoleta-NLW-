import { Request, Response } from 'express';
import Point from '../models/Point';

class PointController {
  static async index(req: Request, res: Response) {
    const items = await Point.select();

    return res.json(items);
  }

  static async store(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
      items,
    } = req.body;

    const response = await Point.insert({
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
    });

    return res.json(response);
  }
}

export default PointController;
