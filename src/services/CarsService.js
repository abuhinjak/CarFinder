const API_URL = "https://64dd38ede64a8525a0f7c020.mockapi.io/api/v1";

// export const getMakesAsync = async ({limit = 8, page = 1}) => {
//     try {
//         const queryParams = new URLSearchParams({limit, page}).toString();

//         const response = await fetch(`${API_URL}/makes?${queryParams}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };

// export const deleteMakeAsync = async (id) => {
//     try {
//         const requestOptions = {
//             method: "DELETE",
//         };
//         const response = await fetch(`${API_URL}/makes/${id}`, requestOptions);
//         return response;
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }
// }

class CarsService {
    
    get = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(`${API_URL}/makes?${urlParams}`, options);
        const response = await fetch(request);
        return response.json();
    }

    delete = async (id) => {
        const options = {
            method: "DELETE",
        }
        const request = new Request(`${API_URL}/makes/${id}`, options);
        const response = await fetch(request);
        return response;
    }
}

export default CarsService;