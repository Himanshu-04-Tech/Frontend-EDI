import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10-second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends credit features to the FastAPI ML backend.
 * Comments: Integrates directly with FastAPI POST /predict endpoint.
 * Payload format matches the model's feature vector exactly.
 */
export const predictCreditRisk = async (payload) => {
  try {
    const response = await apiClient.post('/predict', payload);
    return response.data;
  } catch (error) {
    let userMessage = 'An unexpected error occurred during analysis.';
    let isOffline = false;

    if (error.code === 'ECONNABORTED') {
      userMessage = 'Connection Timeout: The AI model took too long to run calculations. Please retry.';
    } else if (!error.response) {
      isOffline = true;
      userMessage = `FastAPI Server Offline: Unable to contact prediction model at ${API_BASE_URL}/predict. Please ensure your Python server is running and CORS is configured.`;
    } else {
      const status = error.response.status;
      const details = error.response.data?.detail;
      
      if (status === 422) {
        userMessage = 'Data Validation Error: FastAPI rejected the feature format. Check data schema.';
      } else if (status >= 500) {
        userMessage = `Model Server Error (${status}): The backend failed to evaluate the risk model.`;
      } else if (details) {
        userMessage = typeof details === 'string' ? details : JSON.stringify(details);
      }
    }

    const apiError = new Error(userMessage);
    apiError.isOffline = isOffline;
    apiError.status = error.response?.status;
    throw apiError;
  }
};
