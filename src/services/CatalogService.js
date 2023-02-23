import axios from "axios";
import { generateAuthHeader } from "../utils/authHelper";

class DataService {

  static async postGenderData(data) {
    const apiURL = process.env.REACT_APP_API_URL;
    console.log('Genero registrado '+ data);
    const response = await axios.post(`${apiURL}/api/gender`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        withCredentials: true,
      },
    });
    console.log('respuesta '+ data);
    return response.data;
  }  
    static async getGenderData() {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${apiURL}/api/gender`);
            console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
    static async getDataById(id) {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.get(`${apiURL}/api/gender/${id}`);
          console.log('Respuesta getDataById ',response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    static async deleteData(id) {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.delete(`${apiURL}/api/gender/${id}`);

        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    static async postPaymentData(data) {
      const apiURL = process.env.REACT_APP_API_URL;
      console.log('Genero registrado '+ data);
      const response = await axios.post(`${apiURL}/api/payment`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
          withCredentials: true,
        },
      });
      console.log('respuesta '+ data);
      return response.data;
    } 
    static async getPaymentData() {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.get(`${apiURL}/api/payment`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
  }
  static async deletePaymet(id) {
    const apiURL = process.env.REACT_APP_API_URL;
    try {
        const response = await axios.delete(`${apiURL}/api/payment/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
    
}

export default DataService;