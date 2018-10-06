/**
 * Created by congnt on 10/6/18.
 */

"use strict";

import MainRepository from "../repositories/MainRepository";

class MainService {
    getItems(){
        return MainRepository.getItems();
    }
}

export default new MainService()