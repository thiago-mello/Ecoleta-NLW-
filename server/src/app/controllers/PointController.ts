/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import pg from '../../database';
import Point from '../models/Point';
import PointItems from '../models/PointItems';

interface IPointItems {
  itemId: number;
  pointId: number;
}

class PointController {
  static async index(req: Request, res: Response) {
    const { city, state, items: itemsQuery } = req.query as {
      city: string;
      state: string;
      items: string;
    };

    const items = await Point.select({
      where: { city, state, items: itemsQuery },
    });

    return res.json(items);
  }

  static async store(req: Request, res: Response) {
    let response;
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

    await pg.query('BEGIN TRANSACTION');
    try {
      response = await Point.insert({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        state,
      });

      for (const id of items) {
        await PointItems.insert({ item_id: id, point_id: response[0].id });
      }

      await pg.query('COMMIT');
      return res.json(response);
    } catch (err) {
      await pg.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid data.' });
    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const point = await Point.findById(Number(id));
      if (!point) {
        return res.status(404).json({ error: 'Point not found.' });
      }

      const items = await Point.includeItems(Number(id));

      return res.json({ ...point, items });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal sever Error.' });
    }
  }
}

export default PointController;
