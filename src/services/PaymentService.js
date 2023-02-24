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
    
    static async sendMailConfirm(message) {
       let mensaje =
            '<div style="font-family: Arial, Helvetica, sans-serif;" > <table class="MsoNormalTable" border="0" cellpadding="0" align="center" width="0"> <tr bgcolor="#22c1c3"> <td><p> <span> &nbsp;&nbsp;&nbsp; <o:p></o:p> </span> </p> </td> </tr> <tr> <td></td> </tr> <tr> <td></td> </tr> <br> <tr><tr> <td>'+
            '<p> Hi <b>'+message.name+'</b></p>'+
            '<p> '+
            '<p> '+
            'Good, dear client, you have made a purchase of <b>'+message.units+'</b> tennis units for <b>'+message.total+'</b> which will be sent to your address: <b>'+message.address+'</b>'+
            '</p>'+
            '<p>'+
            'We thank you in advance for your preference. Enjoy your purchase!'+
            '</p>'+
            ' <p> <div style="text-align:center;">'+
            '<b>Yours sincerely</b>'+
            '</div ></p>'+
            ' <p><div style="text-align:center;font-style: italic;">'+
            '<b>Sneaker Fever</b>'+
            '</div ></p>'+
            '</td> </tr> </tr><br><tr align="justify"> <td> <p> <span> <o:p></o:p> </span> </p> </td> </tr> <tr bgcolor="#22c1c3"> <td> <p> <span style="color: #22c1c3;"> &nbsp;&nbsp;&nbsp;___________________________________________________________________________________________________ <o:p></o:p> </span> </p> </td> </tr> </table> </div> ';

        let emailbody = {
            "para": message.email,
            "asunto": message.subject,
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