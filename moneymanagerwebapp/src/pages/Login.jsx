import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAppContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
    if (error.response && error.response.data.message) {
        setError(error.response.data.message);
    } else if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
        setError("Server is waking up, please wait 30 seconds and try again.");
    } else {
        console.error('Something went wrong', error);
        setError(error.message);
    }
}
        
            finally {
            setIsLoading(false);
        }
    }

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
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="name@gmail.com"
                            type="text"
                        />
                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="*************"
                            type="password"
                        />

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
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Logging in....
                                </>
                            ) : (
                                "LOGIN"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?{" "}
                            <Link 
                                to="/signup" 
                                className="font-medium text-blue-600 underline hover:text-purple-800 transition-colors"
                            >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;