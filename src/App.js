import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";



const Grocery = lazy(() => import("./components/Grocery"));     //Here this import is a function which takes the path 


const AppLayout = () => {

    const [userName, setUserName] = useState();

//Authentication
useEffect(()=>{
    //Make an API call and send username and password
    const data = {
        name: "Ajay Chaudhary"
    }
    setUserName(data.name);
},[]);

    return (
        <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
        <div className="app">
            <Header />
            <Outlet />
        </div>
        </UserContext.Provider>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            // {
            //     path: "/forgot-password",
            //     element: <About />
            // },
            // {
            //     path: "/reset-password/:id",
            //     element: <About />
            // },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading...</h1>}> <Grocery /> </Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            }
        ],
        errorElement: <Error />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);