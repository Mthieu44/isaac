import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Wiki from './js/Wiki';
import ErrorPage from './js/ErrorPage';
import Root from './js/Root';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/wiki",
        element: <Wiki />
      },
      {
        path: "/isaacdle",
        element: <div>cc vous êtes sur le isaacdle</div>
      },
      {
        path: "/guessall",
        element: <div>cc vous êtes sur le guessall</div>
      },
    ]
  },
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
