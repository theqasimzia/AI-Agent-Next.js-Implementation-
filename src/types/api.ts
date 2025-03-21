// API Error Types
export interface APIError {
    message: string;
    code: string;
    status: number;
  }
  
  // API Response Types
  export interface APIResponse<T> {
    data?: T;
    error?: APIError;
  }
  
  // API Request Types
  export interface ChatRequestBody {
    message: string;
    sessionId: string;
  }
  
  // API Configuration Types
  export interface APIConfig {
    baseURL: string;
    headers: {
      [key: string]: string;
    };
  }
  
  // API Endpoints
  export const API_ENDPOINTS = {
    CHAT: '/api/chat',
    SESSIONS: '/api/sessions',
    USER: '/api/user',
  } as const;
  
  // HTTP Methods
  export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  } as const;
  
  export type HTTPMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];