import React, { useState, useEffect } from 'react';
import './App.css';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import BookDetail from './components/BookDetail';
import BookFilter from './components/BookFilter';
import ToastContainer from './components/ToastContainer';
import { getAllBooks, createBook, updateBookStatus, deleteBook, getBookById } from './services/bookService';

function App() {
  const [books, setBooks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams, setSearchParams] = useState({ criteria: '', value: '' });
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books whenever status filter changes
  useEffect(() => {
    const filters = { status: activeFilter };
    if (searchParams.criteria && searchParams.value) {
      filters[searchParams.criteria] = searchParams.value;
    }
    fetchBooks(filters);
  }, [activeFilter, searchParams]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const fetchBooks = async (filters = {}) => {
    setIsLoading(true);
    try {
      const data = await getAllBooks(filters);
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      addToast('Failed to fetch books. Please try again later.', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      await createBook(bookData);
      const filters = { status: activeFilter };
      if (searchParams.criteria && searchParams.value) {
        filters[searchParams.criteria] = searchParams.value;
      }
      fetchBooks(filters); // Refresh the book list with current filters
      addToast(`"${bookData.title}" has been added successfully!`, 'success');
      return true;
    } catch (err) {
      addToast('Failed to add book. Please try again.', 'error');
      console.error(err);
      return false;
    }
  };

  const handleToggleStatus = async (bookId, newStatus) => {
    try {
      await updateBookStatus(bookId, newStatus);
      
      // Update local state
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === bookId ? { ...book, status: newStatus } : book
        )
      );
      
      // If a book is selected in the detail view, update it too
      if (selectedBook && selectedBook._id === bookId) {
        setSelectedBook(prev => ({ ...prev, status: newStatus }));
      }

      const statusText = newStatus === 'read' ? 'marked as read' : 'marked as unread';
      const bookTitle = books.find(book => book._id === bookId)?.title || 'Book';
      addToast(`"${bookTitle}" ${statusText}`, 'success');
    } catch (err) {
      addToast('Failed to update book status. Please try again.', 'error');
      console.error(err);
    }
  };

  const handleViewDetails = async (bookId) => {
    try {
      const bookDetails = await getBookById(bookId);
      setSelectedBook(bookDetails);
    } catch (err) {
      addToast('Failed to load book details. Please try again.', 'error');
      console.error(err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      const deletedBook = books.find(book => book._id === bookId);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      setSelectedBook(null); // Close the detail view
      addToast(`"${deletedBook?.title || 'Book'}" has been deleted`, 'info');
    } catch (err) {
      addToast('Failed to delete book. Please try again.', 'error');
      console.error(err);
    }
  };

  const handleSearch = (criteria, value) => {
    setSearchParams({ criteria, value });
  };

  const applyFilter = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">My Book Library</h1>
          <p className="text-blue-100">Keep track of your reading journey</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Books</h2>
          <button
            onClick={() => setIsAddBookModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Book
          </button>
        </div>
        
        <BookFilter 
          activeFilter={activeFilter} 
          onFilterChange={applyFilter} 
          onSearch={handleSearch}
        />
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading books...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : books.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-6 text-center">
            <p className="text-yellow-700">
              {activeFilter === 'all' && !searchParams.value
                ? "You don't have any books yet. Add your first book!" 
                : "No books match your current filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <BookCard
                key={book._id}
                book={book}
                onToggleStatus={handleToggleStatus}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Book Form Modal */}
      <BookForm 
        isOpen={isAddBookModalOpen} 
        onClose={() => setIsAddBookModalOpen(false)} 
        onAddBook={handleAddBook} 
      />
      
      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteBook}
        />
      )}
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Book Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 