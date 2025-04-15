// Mock auth service using localStorage
const USER_STORAGE_KEY = 'user';

// Login user
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulating API call delay
    setTimeout(() => {
      // Mock validation (in a real app, this would be an API call)
      if (email === 'admin@example.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };

        // Store user in localStorage
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

// Logout user
export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  return Promise.resolve();
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Register user (for future implementation)
export const register = () => {
  return new Promise((resolve, reject) => {
    // Simulating API call delay
    setTimeout(() => {
      // In a real application, this would call an API to register the user
      reject(new Error('Registration is not implemented in this demo'));
    }, 500);
  });
};
