import { Outlet } from "react-router";
import Navbar from "../navbar/navbar"

export default function Layout(){
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}