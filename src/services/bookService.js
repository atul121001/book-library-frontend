import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getAllBooks = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    // Add status filter if present and not 'all'
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status);
    }
    
    // Add title filter if present
    if (filters.title) {
      queryParams.append('title', filters.title);
    }
    
    // Add author filter if present
    if (filters.author) {
      queryParams.append('author', filters.author);
    }
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/books${queryString ? `?${queryString}` : ''}`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book ${bookId}:`, error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/book/create`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    const response = await axios.patch(`${API_URL}/book/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book ${bookId}:`, error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book ${bookId}:`, error);
    throw error;
  }
};

export const updateBookStatus = async (bookId, status) => {
  return updateBook(bookId, { status });
}; 