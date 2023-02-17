import axiosClient from "../axiosClient";

export function login(data) {
  return axiosClient.post("/auth", data);
}

export function signup(data) {
  return axiosClient.post("/users", data);
}

export function getCurrentUser() {
  return axiosClient.get("/users/me");
}
