/**
 * Sets up a WebSocket connection to the specified endpoint
 * Uses the same base URL as axios but converts to WebSocket protocol
 * @param url - The WebSocket endpoint path (e.g., "bp", "notification", "historical", "dashboard")
 * @returns WebSocket instance
 */
export const setUpWebSocketConnection = (url: string): WebSocket => {
  const baseURL: string = import.meta.env.VITE_DOMAIN_NAME;
  
  // Remove trailing slashes
  const cleanBaseURL = baseURL.replace(/\/+$/, "");
  
  // Convert HTTP/HTTPS to WS/WSS and construct WebSocket URL
  let wsURL: string;
  if (cleanBaseURL.startsWith("https://")) {
    wsURL = cleanBaseURL.replace("https://", "wss://");
  } else if (cleanBaseURL.startsWith("http://")) {
    wsURL = cleanBaseURL.replace("http://", "ws://");
  } else {
    // If no protocol, assume http and convert to ws
    wsURL = `ws://${cleanBaseURL}`;
  }
  
  // Append the WebSocket path
  // The baseURL should already include /api if needed (same as axios)
  const wsPath = `${wsURL}/auth/ws/${url}`;
  
  return new WebSocket(wsPath);
}; 
