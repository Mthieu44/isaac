import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Wiki from './js/wiki/Wiki';
import ErrorPage from './js/ErrorPage';
import Root from './js/Root';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Isaacdle from './js/isaacdle/Isaacdle';


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
        element: <Isaacdle />
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
