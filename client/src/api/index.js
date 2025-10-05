import axios from 'axios';

const API_URL = 'http://localhost:8000/api/data';

export const getData = async () => {
    try {
        const response = await axios.get(API_URL);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const createData = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

export const updateData = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
};



// export const deleteData = async (id) => {
//     try {
//         const response = await axios.delete(`${API_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting data:', error);
//     }
// };