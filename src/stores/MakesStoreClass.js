import { makeAutoObservable, observable, runInAction, action } from "mobx";
import { getMakesAsync, deleteMakeAsync } from "../services/CarsService";

export class MakesStoreClass {
    makes = [];
    status = 'loading';

    constructor() {
        makeAutoObservable(this, {
            makes: observable,
            status: observable,
            fetchMakesAsync: action,
            deleteMakeAsync: action
        });
    }

    async fetchMakesAsync() {
        try {
            const makes = await getMakesAsync();
            runInAction(() => {
                this.makes = makes;
                this.setStatus('success'); 
            });
        } catch (error) {
            console.log(error);
            this.setStatus('error');
        }
    }

    async deleteMakeAsync(id) { // Promijenjeno ime metode
        try {
            const response = await deleteMakeAsync(id);
            if (response.ok) {
                await this.fetchMakesAsync(8,1);
                this.setStatus('success');
            }
        } catch (error) {
            console.log(error);
            this.setStatus('error');
        }
    }

    setStatus(status) {
        this.status = status;
    }
}
