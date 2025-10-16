// hooks/useUser.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserFromToken } from '@/utils/token';
import { getCookie } from '@/utils/cookies';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserFromAPI = async (token: string): Promise<User | null> => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API user fetch failed:', error);
      return null;
    }
  };

  const fetchUserFromToken = (token: string): User | null => {
    try {
      const tokenData = getUserFromToken(token);
      if (tokenData) {
        return {
          id: tokenData.id,
          name: tokenData.name,
          email: tokenData.email,
        };
      }
      return null;
    } catch (error) {
      console.error('Token decode failed:', error);
      return null;
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getCookie("TOKEN");
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Try API first
      let userData = await fetchUserFromAPI(token);
      
      // If API fails, fall back to token decoding
      if (!userData) {
        console.log('API failed, falling back to token decoding');
        userData = fetchUserFromToken(token);
      }

      if (userData) {
        setUser(userData);
      } else {
        setError('Failed to get user information');
        // Clear invalid token
        document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      }
    } catch (err: any) {
      console.error('Error in user fetch:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
};