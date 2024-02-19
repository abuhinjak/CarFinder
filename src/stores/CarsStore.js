import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import CarsService from "../services/CarsService";

class CarsStore {
    carsData = {
        makes: [],
        limit: 8,
        page: 1,
    };
    modelsData = {
        models: [],
        limit: 8,
        page: 1,
    };
    status = "";
    view = 'grid';
    orderBy = 'name';
    order = 'asc';

    constructor() {
        makeAutoObservable(this);
        this.carsService = new CarsService();

        makePersistable(this, {
            name: "CarsStore",
            properties: ["carsData", "modelsData", "status"],
            storage: window.sessionStorage        
        })
    }

    nextPage() {
        this.carsData.page++;
        this.fetchCars();
    }

    firstPage() {
        this.carsData.page = 1;
        this.fetchCars();
    }

    sortMakes(order, makeID) {
        this.order = order;
        if(makeID) {
            this.fetchModels(makeID);
        } else {
            this.fetchCars();
        }
    }

    handleView(view) {
        this.view = view;
    }

    *fetchCars(search) {
        this.status = "loading";
        const params = {
            limit: this.carsData.limit,
            page: this.carsData.page,
            orderBy: this.orderBy,
            order: this.order,
            search: search ? search : ''
        }
        try {
            const urlParams = new URLSearchParams(Object.entries(params));
            const cars = yield this.carsService.getAllMakes(urlParams);
            this.carsData.makes = cars;
        } catch (error) {
            this.status = "error";
        } finally {
            this.status = "success";
        }
    }

    *createNewMake(data) {
        try {
            const response = yield this.carsService.newMake(data);
            if(response.ok) {
                yield this.fetchCars();
                this.status = "success";
            }
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }

    *editMakeData(data, id) {
        try {
            const response = yield this.carsService.editMake(data, id);
            if(response.ok) {
                yield this.fetchCars();
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
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

    *fetchModels(id) {
        this.status = "loading";
        try {
            var params = {
                limit: this.modelsData.limit,
                page: this.modelsData.page,
                orderBy: this.orderBy,
                order: this.order,

            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const models = yield this.carsService.getModels(id, urlParams);
            this.modelsData.models = models;
            this.status = "pending";
        } catch (error) {
            this.status = "error";
        } finally {
            this.status = "success";
        }
    }

    *createNewModel(data, makesID) {
        try {
            const response = yield this.carsService.newModel(data, makesID);
            if(response.ok) {
                yield this.fetchModels(makesID);
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }

    *editModelData(data, makesID, modelID ) {
        try {
            const response = yield this.carsService.editModel(data, makesID, modelID);
            if(response.ok) {
                yield this.fetchModels(makesID);
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }

    *deleteModel(makeID, modelID) {
        try {
            const response = yield this.carsService.deleteModel(makeID, modelID);
            if(response.ok) {
                yield this.fetchModels(makeID);
                this.status = "success";
            } 
        } catch (error) {
            console.log(error);
            this.status = "error";
        }
    }
}

export const carsStore = new CarsStore();