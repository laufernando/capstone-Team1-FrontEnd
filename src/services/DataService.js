import axios from "axios";
import { generateAuthHeader } from "../utils/authHelper";

class DataService {
    

    static async getData() {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            console.log('Se obtienen los tenis con axios')
            const response = await axios.get(`${apiURL}/api/sneaker`);
            console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
    }

    static async uploadFile(data) {
      const apiURL = process.env.REACT_APP_API_URL;
      return await axios.post(`${apiURL}/api/sneaker`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }  
    
    static async getDataById(id) {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.get(`${apiURL}/api/sneaker/${id}`);
          console.log('Respuesta getDataById ',response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

  static async getGender() {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          console.log('Se obtienen los generos')
          const response = await axios.get(`${apiURL}/api/gender`);
          console.log(response.data);
          return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
  }  
  
  static async getSize() {
    const apiURL = process.env.REACT_APP_API_URL;
    try {
        console.log('Se obtienen las tallas')
        const response = await axios.get(`${apiURL}/api/size`);
        console.log(response.data);
        return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  } 

  static async updateSneaker(data) {
    const apiURL = process.env.REACT_APP_API_URL;
    return await axios.put(`${apiURL}/api/sneaker`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } 
  
  static async deleteSneaker(id) {
    const apiURL = process.env.REACT_APP_API_URL;
    return await axios.delete(`${apiURL}/api/sneaker/${id}`, {
      headers: {
        ...generateAuthHeader()
      },
    });   
  } 
  
  static async sendMail(data) {
    const apiURL = process.env.REACT_APP_API_URL;
    return await axios.post(`${apiURL}/api/mail`, data, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
    });   
  } 
}

export default DataService;