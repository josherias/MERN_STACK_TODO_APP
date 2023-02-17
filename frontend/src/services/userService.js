import axiosClient from "../axiosClient";

export function uploadProfilePhoto(data) {
  return axiosClient.post("/users/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateUserProfile(data) {
  return axiosClient.put("/users", data);
}
