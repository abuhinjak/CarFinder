const API_URL = "https://64dd38ede64a8525a0f7c020.mockapi.io/api/v1";

class CarsService {
    
    getMakes = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(`${API_URL}/makes?${urlParams}`, options);
        const response = await fetch(request);
        return response.json();
    }

    getModels = async (id) => {
        const options = {
            method: "GET",
        }
        const request = new Request(`${API_URL}/makes/${id}/models`, options);
        const response = await fetch(request);
        return response.json();
    }

    deleteMake = async (id) => {
        const options = {
            method: "DELETE",
        }
        const request = new Request(`${API_URL}/makes/${id}`, options);
        const response = await fetch(request);
        return response;
    }
}

export default CarsService;