import axios from 'axios';
import * as token from "./token.js";

class Api {
    
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

   getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    getNotes() {
        return axios.get(`${this._baseURL}/notes`, { headers: this.getAuthorizationHeaders() })
        .then((res) => {
            return res.data.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    createNote(noteData) {
      const { title, content, owner } = noteData;

      if (!title || !content || !owner) {
        return Promise.reject("Todos os campos são obrigatórios.");
      }

       return axios.post(`${this._baseURL}/notes`, noteData, { headers: this.getAuthorizationHeaders() })
       .then((res) => {
        return res.data.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }

}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };