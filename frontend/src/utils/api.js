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

      async deleteNote(id) {
      try {
        const res = await axios.delete(`${this._baseURL}/notes/${id}`, { headers: this.getAuthorizationHeaders() });
        return res.data;
      } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : error.message}`);
      }
    }

    updateNote(id, { title, content }) {
      if (!id) {
        return Promise.reject("O ID é obrigatório.");
      }

      const updatedFields = {};

       if (content !== undefined) updatedFields.content = content;
       if (title !== undefined) updatedFields.title = title;
    
      return axios.patch(`${this._baseURL}/notes/${id}`, updatedFields, { headers: this.getAuthorizationHeaders() })
        .then((res) => res.data.data)
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