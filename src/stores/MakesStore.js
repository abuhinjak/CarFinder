import { makeAutoObservable, observable, runInAction } from "mobx";
import { getMakes, deleteMake } from "../services/CarsService";

export function createMakesStore() {
    const makesStore = {
        makes: [],
        status: "pending",

        getAllMakes: async (limit = 2, page = 1) => {
            try {
                const makes = await getMakes(limit, page);
                runInAction(() => {
                    makesStore.makes = makes;
                    makesStore.status = "success";
                })
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    makesStore.status = "error";
                });
            }
        },

        deleteSingleMake: async (id) => {
            try {
                const response = await deleteMake(id);
                if(response.ok) {
                    runInAction(() => {
                        // makesStore.getAllMakes(4,1);
                        makesStore.getAllMakes(4,1);
                        makesStore.status = "success";
                    })
                } 
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    makesStore.status = "error";
                });
            }
        }
    }


    makeAutoObservable(makesStore, {
        makes: observable,
        status: observable,
    });

    return makesStore;
}