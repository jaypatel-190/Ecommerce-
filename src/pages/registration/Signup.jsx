import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../Components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate
    const navigate = useNavigate();

    // User Signup State
    const [userSignup, setUserSignup] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        role: "user"
    });

    /*  User Signup Function   */
    const userSignupFunction = async () => {
        // validation
        if (
            userSignup.firstName === "" ||
            userSignup.lastName === "" ||
            userSignup.email === "" ||
            userSignup.password === "" ||
            userSignup.confirmPassword === "" ||
            userSignup.contactNumber === ""
        ) {
            toast.error("All Fields are required");
            return;
        }

        if (userSignup.password !== userSignup.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                firstName: userSignup.firstName,
                lastName: userSignup.lastName,
                email: users.user.email,
                uid: users.user.uid,
                contactNumber: userSignup.contactNumber,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };

            // create user Reference
            const userReference = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userReference, user);

            setUserSignup({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                contactNumber: "",
                role: "user"
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            toast.error("Signup failed");
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Signup Form */}
            <form onSubmit={(e) => {e.preventDefault(); userSignupFunction();}} className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                {/* Top Heading */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input First Name */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='First Name'
                        value={userSignup.firstName}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                firstName: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Last Name */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Last Name'
                        value={userSignup.lastName}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                lastName: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Email */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Password */}
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Confirm Password */}
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={userSignup.confirmPassword}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                confirmPassword: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Contact Number */}
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder='Contact Number'
                        value={userSignup.contactNumber}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                contactNumber: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type='submit'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </form>
        </div>
    );
}

export default Signup;
