import React from 'react';

const BookDetail = ({ book, onClose, onToggleStatus, onDelete }) => {
  if (!book) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-xl text-gray-600 mb-2">By {book.author}</p>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                book.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {book.status === 'read' ? 'Read' : 'Unread'}
              </span>
              {book.createdAt && (
                <span className="text-sm text-gray-500 ml-4">
                  Added on {formatDate(book.createdAt)}
                </span>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{book.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => onToggleStatus(book._id, book.status === 'read' ? 'unread' : 'read')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                book.status === 'read' 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Mark as {book.status === 'read' ? 'Unread' : 'Read'}
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this book?')) {
                  onDelete(book._id);
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 