import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserContextProvider } from './context/UserContext.jsx'; // Importing UserContextProvider as a named export
import  {CourseContextProvider}from './context/CourseContext.jsx';

//now we cerate the variable where we gave the server url where we featch the apis 
export const server ='http://localhost:3000';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider> <App /> </CourseContextProvider>
      
    </UserContextProvider>
  </StrictMode>
);
