import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets.js';
import Input from "../components/Input.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.jsx";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl="";
        setIsLoading(true);

        if (!fullName.trim()) {
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }
        if (!email.trim()) {
            setError("Please enter your valid email");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        setError("");
        //signup api call
        try {
            //upload image if present
            if(profilePhoto){
                const imageUrl=await uploadProfileImage(profilePhoto);
                profileImageUrl=imageUrl ||"";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            if (response.status === 201) {
                toast.success("Profile created successfully");
                navigate("/login");
            }
        } catch (err) {
            console.log('Something went wrong', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img
                src={assets.login_bg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover filter blur-sm"
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start Tracking your Spending By Joining With Us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* ✅ Profile photo centered at top */}
                        <div className="flex justify-center mb-2">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>

                        {/* ✅ All fields in a single vertical column */}
                        <div className="flex flex-col gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="Enter your fullName"
                                type="text"
                            />
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                placeholder="name@gmail.com"
                                type="email"
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="*************"
                                type="password"
                            />
                        </div>

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={isLoading}
                            className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    Signing up....
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 underline hover:text-purple-800 transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;