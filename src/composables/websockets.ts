export const setUpWebSocketConnection = (url: string) => {
  const app_name:string = import.meta.env.VITE_DOMAIN_NAME;


  let domain = ""
  let ws: WebSocket
  if(app_name.includes("https")){
    domain = app_name.replace("https://", "");
    ws = new WebSocket(`wss://${domain}/auth/ws/${url}`);
  }else{
    domain = app_name.replace("http://", "")
    ws = new WebSocket(`ws://${domain}/auth/ws/${url}`);
  }

  
  
 
  return ws;
}; 
