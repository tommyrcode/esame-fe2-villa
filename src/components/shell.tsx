import { Outlet } from "react-router";
import Header from "./header";
import './shell.css';


function Shell() {
    return (
        <div className="shell">
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}

export default Shell;