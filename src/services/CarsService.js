const API_URL = "https://64dd38ede64a8525a0f7c020.mockapi.io/api/v1";

class CarsService {
    // Makes
    getAllMakes = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(`${API_URL}/makes?${urlParams}`, options);
        const response = await fetch(request);
        return response.json();
    }

    editMake = async (data, id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const options = {
                method: "PUT",
                headers,
                body: JSON.stringify(data)
            }
            const request = new Request(`${API_URL}/makes/${id}`, options);
            const response = await fetch(request);
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response;            
        } catch (error) {
            console.log(error);
        } finally {
            this.status = "success";
        }
    }

    newMake = async (data) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            }
            const request = new Request(`${API_URL}/makes`, options);
            const response = await fetch(request);
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response;            
        } catch (error) {
            console.log(error);
        } finally {
            this.status = "success";
        }
    }

    deleteMake = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(`${API_URL}/makes/${id}`, options);
        const response = await fetch(request);
        return response;
    }

    // Models
    getModels = async (id, urlParams) => {
        const options = {
            method: "GET",

        }
        const request = new Request(`${API_URL}/makes/${id}/models/?${urlParams}`, options);
        const response = await fetch(request);
        return response.json();
    }

    newModel = async (data, makesID) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            }
            const request = new Request(`${API_URL}/makes/${makesID}/models`, options);
            const response = await fetch(request);
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response;            
        } catch (error) {
            console.log(error);
        } finally {
            this.status = "success";
        }
    }

    editModel = async (data, makesID, modelID) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const options = {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
            };
            const request = new Request(`${API_URL}/makes/${makesID}/models/${modelID}`, options);
            const response = await fetch(request);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error; 
        } finally {
            this.status = "success";
        }
    };

    deleteModel = async (makeID, modelID) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(`${API_URL}/makes/${makeID}/models/${modelID}`, options);
        const response = await fetch(request);
        return response;
    }


}

export default CarsService;