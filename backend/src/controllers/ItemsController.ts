import { Request, Response } from "express";

import {BASE_URL} from '../constants';
import knex from "../database/connection";

/**
 * show items
 * @param {Request} req
 * @param {Response} res
 */
export async function index(req:Request, res:Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${BASE_URL}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
}

