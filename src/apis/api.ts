import axios, { AxiosInstance } from "axios";

const baseUrl = "http://localhost:5000/api";

const photographer: AxiosInstance = axios.create({
    baseURL: `${baseUrl}/photographers`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PhotographerPayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  email?: string;
  whatsappNo?: string;
  spotlightDescription?: string;
  profileImage?: string;
}

export const photographerAPI = {
  list: () => photographer.get("/"),

  create: (data: PhotographerPayload) =>
    photographer.post("/", data),

  getById: (id: number | string) =>
    photographer.get(`/${id}`),

  update: (id: number | string, data: PhotographerPayload) =>
    photographer.put(`/${id}`, data),

  remove: (id: number | string) =>
    photographer.delete(`/${id}`),
};
