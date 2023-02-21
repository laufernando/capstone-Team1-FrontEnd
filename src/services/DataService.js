import axios from "axios";

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
}

export default DataService;