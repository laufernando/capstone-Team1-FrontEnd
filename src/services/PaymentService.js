import axios from "axios";

class PaymentService {

    static async getDataById(id) {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${apiURL}/api/sneaker/${id}`);
            console.log('Respuesta getDataById ', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    static async getDataByItems(items) {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            const response =await axios.post(`${apiURL}/api/sneaker/items`, items, {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
            });            
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }    
    static async createGuest(data) {
        const apiURL = process.env.REACT_APP_API_URL;
        const response =await axios.post(`${apiURL}/api/guest`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
}


export default PaymentService;