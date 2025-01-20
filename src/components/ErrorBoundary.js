import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // For error icon
import { Link } from 'react-router-dom'; // Optional: For a "Go to Home" link

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    this.setState({ error, errorInfo });
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload(); // Reload the page to reset the state
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-800 text-white p-6">
          <div className="max-w-md text-center bg-red-600 p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <FaExclamationTriangle className="text-6xl mb-4 mx-auto text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h2>
            <p className="mb-4">We encountered an error while rendering this component. Please try again later.</p>
            <button
              onClick={this.handleReload}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Reload Page
            </button>
            <div className="mt-4">
              <Link to="/" className="text-yellow-300 hover:text-yellow-200">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; // If no error, render the children components
  }
}

export default ErrorBoundary;
