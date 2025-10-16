// utils/token.ts

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Simple JWT decode function (client-side only)
export const decodeToken = (token: string): UserPayload | null => {
  try {
    if (!token) return null;
    
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Alias for decodeToken - this is the function you need
export const getUserFromToken = (token: string): UserPayload | null => {
  return decodeToken(token);
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  
  return Date.now() >= payload.exp * 1000;
};

// Get user info from token
export const getUserInfo = (token: string) => {
  const payload = decodeToken(token);
  if (!payload) return null;
  
  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
};