/**
 * Created by congnt on 10/6/18.
 */

"use strict";

import MainRepository from "../repositories/TourRepository";

class TourService {
    getItems(){
        return MainRepository.getItems();
    }
}

export default new TourService()