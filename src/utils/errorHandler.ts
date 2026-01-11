/**
 * Frontend error handling utilities
 */

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errorMessage?: string;
    };
    status?: number;
  };
  message?: string;
}

/**
 * Extracts error message from API error
 */
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const apiError = error as ApiError;
    
    if (apiError.response?.data?.message) {
      return apiError.response.data.message;
    }
    
    if (apiError.response?.data?.errorMessage) {
      return apiError.response.data.errorMessage;
    }
    
    if (apiError.message) {
      return apiError.message;
    }
  }
  
  return 'An unexpected error occurred';
}

/**
 * Checks if error is an API error
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error
  );
}

/**
 * Gets HTTP status code from error
 */
export function getErrorStatus(error: unknown): number | undefined {
  if (isApiError(error)) {
    return error.response?.status;
  }
  return undefined;
}
