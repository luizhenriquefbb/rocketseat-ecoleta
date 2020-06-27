import { Response, Request, response } from 'express';
import knex from '../database/connection';
import PointModel from '../models/PointModel';

/**
 * create points
 * @param {Request} req
 * @param {Response} res
 */
export async function store(req: Request, res: Response) {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        UF,
        items,
    } = req.body;

    // using default image for now
    const image = "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60";

    // check if all attributes exists and came from post
    if (
        !name ||
        !email ||
        !whatsapp ||
        !latitude ||
        !longitude ||
        !city ||
        !UF ||
        !items
    ) {
        return res.status(400).json({ reason: 'missing parameters' });
    }



    const point = new PointModel({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        UF,
        image,
    });

    // to undo queries if one fails
    const trx = await knex.transaction();

    const insertedPointIds = await trx('points').insert(point);
    point.id = insertedPointIds[0];


    const pointItems = items.map((item_id: Number) => {
        return {
            item_id,
            point_id: insertedPointIds[0],
        }
    });

    await trx('points_items').insert(pointItems);

    // save transactions
    await trx.commit();

    return res.json({ pointCreated: point });
}

/**
 * show point by id
 * @param params
 */
export async function show(req: Request, res: Response) {
    const pointId = req.params.id;


    const point = await knex('points').where('id', pointId).first();

    const items = await knex('items').
        join('points_items', 'items.id', '=', 'points_items.item_id').
        where('points_items.item_id', pointId);

    if (!point) {
        return res.status(400).json({
            reason: 'point not found',
        });

    } else {
        return res.status(200).json({
            point,
            items
        });
    }
}

export async function index(req:Request, res:Response) {
    const { city, uf, items_ids } = req.query;

    let query = knex('points')
        .join('points_items', 'points.id', '=', 'points_items.point_id')

    if (items_ids){
        // parse items_ids
        const parsedItemsIds: Number[] =
            String(items_ids).split(',').map(item_id => {
                return Number(String(item_id).trim());
            });

        query.whereIn('points_items.item_id', parsedItemsIds);
    }

    if (city) {
        query.where('city', String(city))
    }

    if (uf) {
        query.where('uf', String(uf))
    }

    const pointsQuery = await query.distinct()
        .select('points.*');


    const points = pointsQuery.map(point => {
        return new PointModel({
            id: point.id,
            name: point.name,
            email: point.email,
            whatsapp: point.whatsapp,
            latitude: point.latitude,
            longitude: point.longitude,
            city: point.city,
            UF: point.UF,
            image: point.image,
        });
    })

    return res.json({
        points,
    });
}