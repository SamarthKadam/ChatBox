import { Link } from "react-router-dom";
import NotfoundPic from '../assets/images/404.png';
export default function NotFoundPage() {
    return (
        <>
        <div className=" w-[100%] flex flex-col items-center h-[100vh]">
            <img src={NotfoundPic} alt="404" className="h-[700px] max-[500px]:h-[400px] top-2 filter drop-shadow-2xl "/>
        </div>
        </>
    );
}
