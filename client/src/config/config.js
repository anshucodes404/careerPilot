// Environment configuration for the application
export const config = {
  // Backend URLs
  BACKEND_URLS: {
    LOCAL: "http://localhost:5000",
    HOSTED: "https://careerpilot-backend-ix96.onrender.com",
  },

  // Current environment - change this to switch between local and hosted
  CURRENT_ENV: "LOCAL", // Change to "HOSTED" for production

  // Get the current backend URL based on environment
  getBackendUrl: function () {
    return this.BACKEND_URLS[this.CURRENT_ENV];
  },
};
