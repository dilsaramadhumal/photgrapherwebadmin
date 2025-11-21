import axios, { AxiosInstance } from "axios";

const baseUrl = "http://localhost:5000/api";

const review: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/reviews`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ReviewPayload {
  photographerId?: number;
  clientName?: string;
  rating?: number;
  comment?: string;
  photoUrl?: string;
}

export const reviewAPI = {
  list: () => review.get("/"),

  create: (data: ReviewPayload) =>
    review.post("/", data),

  getById: (id: number | string) =>
    review.get(`/${id}`),

  getByPhotographerId: (photographerId: number | string) =>
    review.get(`/photographer/${photographerId}`),

  update: (id: number | string, data: ReviewPayload) =>
    review.put(`/${id}`, data),

  remove: (id: number | string) =>
    review.delete(`/${id}`),
};