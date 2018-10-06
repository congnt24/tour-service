/**
 * Created by congnt on 10/6/18.
 */

"use strict";

import BaseRepository from "./BaseRepository";

class TourRepository extends BaseRepository {
    getItems(filters) {
        return this.rawQuery(`
        SELECT * FROM product.tour 
        WHERE TRUE 
        ORDER BY created_at DESC
        LIMIT 25 OFFSET 0 ;`);
    }
}

export default new TourRepository();