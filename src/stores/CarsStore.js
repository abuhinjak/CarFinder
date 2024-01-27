import { makeAutoObservable } from "mobx";
import CarsService from "../services/CarsService";

class CarsStore {
    carsData = {
        makes: [],
        limit: 8,
        page: 1
    };
    status = "";

    get isLoading() {
        return this.status === "loading";
    }

    constructor() {
        makeAutoObservable(this);
        this.carsService = new CarsService();
    }

    *fetchCars() {
        this.status = "loading";
        try {
            var params = {
                limit: this.carsData.limit,
                page: this.carsData.page
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const cars = yield this.carsService.get(urlParams);
            this.carsData.makes = cars;
            this.status = "success";
        } catch (error) {
            this.status = "error";
        }
    }

    *deleteMake(id) {
        try {
            const response = yield this.carsService.delete(id);
            if(response.ok) {
                yield this.fetchCars();
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }

    get total() {
        return this.carsData.makes.length;
    }
}

export const carsStore = new CarsStore();