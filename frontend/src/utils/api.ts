import axios from 'axios';
import * as token from "./token.ts";

interface ApiOptions {
    baseUrl: string;
    headers: Record<string, string>;
  }
  
  interface Note {
    _id: string;
    title: string;
    content: string;
  }
  
  interface NoteData {
    title: string;
    content: string;
  }

class Api {
    private _baseURL: string;
    private _headers: Record<string, string>;

    constructor(options: ApiOptions) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

   private getAuthorizationHeaders(): Record<string, string> {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    public getNotes(): Promise<Note[]> {
        return axios.get(`${this._baseURL}/notes`, { headers: this.getAuthorizationHeaders() })
        .then((res) => {
            return res.data.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    public createNote(noteData: NoteData): Promise<Note> {
      const { title, content } = noteData;

      if (!title || !content) {
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