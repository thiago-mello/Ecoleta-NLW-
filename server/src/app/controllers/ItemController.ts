import { Request, Response } from 'express';
import Item from '../models/Item';

class ItemController {
  static async index(req: Request, res: Response) {
    const items = await Item.select();
    const serializedItems = items.map((item) => ({
      ...item,
      image_url: `${process.env.APP_URL}/assets/${item.image}`,
    }));

    return res.json(serializedItems);
  }
}

export default ItemController;
