import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import CarsService from "../services/CarsService";

class CarsStore {
    carsData = {
        makes: [],
        limit: 8,
        page: 1
    };
    modelsData = {
        models: [],
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

        makePersistable(this, {
            name: "CarsStore",
            properties: ["carsData", "modelsData", "status"],
            storage: window.sessionStorage        
        })
    }

    *fetchCars() {
        this.status = "loading";
        try {
            var params = {
                limit: this.carsData.limit,
                page: this.carsData.page
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const cars = yield this.carsService.getMakes(urlParams);
            this.carsData.makes = cars;
            this.status = "success";
        } catch (error) {
            this.status = "error";
        }
    }

    *fetchModels(id) {
        this.status = "loading";
        try {
            var params = {
                limit: this.modelsData.limit,
                page: this.modelsData.page
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const models = yield this.carsService.getModels(id, urlParams);
            this.modelsData.models = models;
            this.status = "success";
        } catch (error) {
            this.status = "error";
        }
    }

    *deleteMake(id) {
        try {
            const response = yield this.carsService.deleteMake(id);
            if(response.ok) {
                yield this.fetchCars();
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }
}

export const carsStore = new CarsStore();