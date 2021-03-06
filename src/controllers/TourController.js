/**
 * Created by congnt on 10/6/18.
 */

"use strict";

import MainService from "../services/TourService";

class TourController {
    async getItems(req, res, next) {
        try {
            res.sendJson({data: await MainService.getItems()})
        } catch(err) {
            console.error(err.stack)
        }
    }
}

export default new TourController();