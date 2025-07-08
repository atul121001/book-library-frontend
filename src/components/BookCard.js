import React from 'react';

const BookCard = ({ book, onToggleStatus, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className={`h-2 ${book.status === 'read' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{book.title}</h2>
        <p className="text-gray-600 mb-2">By {book.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{book.description}</p>
        
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            book.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {book.status === 'read' ? 'Read' : 'Unread'}
          </span>
          
          <div className="space-x-2">
            <button
              onClick={() => onToggleStatus(book._id, book.status === 'read' ? 'unread' : 'read')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                book.status === 'read' 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Mark as {book.status === 'read' ? 'Unread' : 'Read'}
            </button>
            
            <button
              onClick={() => onViewDetails(book._id)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 