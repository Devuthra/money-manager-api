import { useContext } from "react";
import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {

    const { user } = useContext(AppContext);

    return (
        <div>
            <Menubar></Menubar>
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        {/* side bar content */}
                        <Sidebar/>
                    </div>
                    <div className="grow mx-5">Right side content</div>
                </div>
            )}
        </div>
    )
}
export default Dashboard;