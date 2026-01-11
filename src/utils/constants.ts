/**
 * Frontend application constants
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  VERIFICATION: '/verification',
  RESET_PASSWORD: '/reset-password',
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  INVALID_CREDENTIALS: 'Invalid credentials',
  EMAIL_REQUIRED: 'Email is required',
  TOKEN_REQUIRED: 'Token is required',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTRATION_SUCCESS: 'Registration successful',
  UPDATE_SUCCESS: 'Updated successfully',
  DELETE_SUCCESS: 'Deleted successfully',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
