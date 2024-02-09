import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import CarsService from "../services/CarsService";

class CarsStore {
    carsData = {
        makes: [],
        limit: 8,
        page: 1,
        sortBy: 'name',
        order: 'asc'
    };
    modelsData = {
        models: [],
        limit: 8,
        page: 1
    };
    status = "";
    modals = {
        createModal: false,
        editModal: false
    };

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

    // // Dodajte event listener samo ako je modal otvoren
    // if (this.modals.createModal) {
    //     // Postavite event listener koji će zatvoriti modal kada se klikne izvan njega
    //     document.addEventListener('click', handleClickOutsideModal);
    // } else {
    //     // Uklonite event listener kada je modal zatvoren
    //     document.removeEventListener('click', handleClickOutsideModal);
    // }

    // const handleClickOutsideModal = (event) => {
    //     const modal = document.getElementById('editForm'); // Zamijenite 'yourModalId' s ID-om vašeg moda
    //     if (modal && !modal.contains(event.target)) {
    //         // Klik je izvan moda, pa zatvorite modal
    //         this.createModalTrigger();
    //     }
    // }

    // createModalTrigger() {
    //     if (this.modals.editModal) {
    //         this.modals.editModal = false;
    //     }
    //     this.modals.createModal = !this.modals.createModal;
    // }

    // editModalTrigger() {
    //     if(this.modals.createModal) {
    //         this.modals.createModal = false;
    //     }
    //     this.modals.editModal = !this.modals.editModal;
    // }

    nextPage() {
        this.carsData.page++;
        this.fetchCars();
    }

    firstPage() {
        this.carsData.page = 1;
        this.fetchCars();
    }

    sortMakes(order) {
        this.carsData.order = order;
        this.fetchCars();
    }

    *fetchCars() {
        this.status = "loading";
        const params = {
            limit: this.carsData.limit,
            page: this.carsData.page,
            sortBy: this.carsData.sortBy,
            order: this.carsData.order
        }
        try {
            const urlParams = new URLSearchParams(Object.entries(params));
            const cars = yield this.carsService.getAllMakes(urlParams);
            console.log(cars)
            this.carsData.makes = cars;
            this.status = "pending";
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
                page: this.modelsData.page
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