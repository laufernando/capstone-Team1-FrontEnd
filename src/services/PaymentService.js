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
    static async getMethodsPayment() {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${apiURL}/api/payment`);
            console.log('Respuesta getMethodsPayment ', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    } 
    static async saveShoppingCart(data) {
        const apiURL = process.env.REACT_APP_API_URL;
        const response =await axios.post(`${apiURL}/api/buy`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }   
    
    static async sendMailConfirm(data) {
       let mensaje ='Buenos dias estimado '+data.name+' se le hace de su conocimiento una compra de calzado por $2500.000.';
        let emailbody = {
            "para": data.email,
            "asunto": "Estimado "+data.name,
            "mensaje": mensaje
          }

        const apiURL = process.env.REACT_APP_API_URL;
        const response =await axios.post(`${apiURL}/api/mail`, JSON.stringify(emailbody), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }   
 
  
}


export default PaymentService;