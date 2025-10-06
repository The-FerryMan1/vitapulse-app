export const setUpWebSocketConnection = (url: string) => {
  const ws = new WebSocket(`ws://localhost:8888/api/auth/ws/${url}`);
  return ws;
};
