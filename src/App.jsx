import React from "react";
import RouteApp from "./RouteApp";
import Cookies from 'js-cookie';
import { useEffect } from "react";

const App =()=>{



// useEffect(() => {
//   const handleBeforeUnload = () => {
//     Cookies.remove('access_token');
//     Cookies.remove('refresh_token');
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, []);
    return(
        <RouteApp/>
    );
};
export default App;
