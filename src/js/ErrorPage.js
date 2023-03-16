import { useRouteError } from "react-router-dom";
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../css/errorpage.css'
import img1 from '../images/error_draw1.png'
import img2 from '../images/error_draw2.png'
import img3 from '../images/error_draw3.png'
import img4 from '../images/error_draw4.png'

const imgset = Math.random() > 0.5 ? 1 : 0

function path(pathname) {
  const lastSlashIndex = pathname.lastIndexOf('/');
  return pathname.substring(0, lastSlashIndex + 1);
}

export default function ErrorPage() {
  const error = useRouteError();
  const [imageIndex, setImageIndex] = useState(1);
  const location = window.location.pathname

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  let imgSrc;
  if (imgset){imgSrc = imageIndex === 1 ? img1 : img2;}
  else{imgSrc = imageIndex === 1 ? img3 : img4;}


  return (
    <div id="error-page">
      
      <img src={imgSrc} alt=""/>
      <p>Seems you landed on the error page...</p>
      <Link to={path(location)}>Click here to get back</Link>
      <br></br>
      <p>Error message:</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}