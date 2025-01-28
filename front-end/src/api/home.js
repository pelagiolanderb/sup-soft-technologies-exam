import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const fetchHomes = async (searchTerm = "") => {
  const response = await axios.get(
    `${API_BASE_URL}/rentals?search=${searchTerm}`
  );
  return response.data;
};

export const createHome = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/rentals`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateHome = async (id, homeData) => {
  for (let [key, value] of homeData.entries()) {
    console.log(`natatanggap : ${key}: ${value}`);
  }
  try {
    const response = await axios.post(
      `${API_BASE_URL}/rentals/${id}`,
      homeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteHome = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/rentals/${id}`);
  return response.data;
};
