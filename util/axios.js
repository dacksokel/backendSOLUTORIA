
import axios from 'axios';
import dotenv from 'dotenv';
import Model from '../model/uf.js'

dotenv.config();

const get_token = async () => {
      let data = JSON.stringify({
        "userName": "dacksokel@gmail.com",
        "flagJson": true
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://postulaciones.solutoria.cl/api/acceso',
        headers: { 
          'Content-Type': 'application/json-patch+json', 
          'Accept': '*/*'
        },
        data : data
      };
      
      try {
        const response = await axios.request(config);
        return response.data.token;
      } catch (error) {
        console.log(error);
      }
}

const make_get_request = async () => {
    const token = await get_token();
    console.log(token)
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://postulaciones.solutoria.cl/api/indicadores',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        for (let i = 0; i < response.data.length; i++) {
            // console.log(response.data[i])
            await Model.create(response.data[i]);
        }
        return response.data
    } catch (error) {
        console.log(error);
        return error;
    }
}



export {get_token, make_get_request};


