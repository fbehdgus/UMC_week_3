import {Outlet} from "react-router-dom";
import Navbar from  "../components/navbar.tsx";

const RootLayout = () => {
    return (
        <>
       
            <Outlet/>
        </>
    );
};

export default RootLayout;
