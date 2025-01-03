import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn() {
    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'phone': '',
    });
    const [formDataL,setFormDataL]=useState({
        'email':'',
        'password':'',
    }) 
    const [formDataF,setFormdataF]=useState({
      'email':'',
      'password':'',
      'confirmpassword':'',
  }) 
    const [currentView, setCurrentView] = useState('login');
    

     

    const [errors, setErrors] = useState({});

        const validateForm = () => {
          const newErrors = {};
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[6-9]\d{9}$/;

          if (!formData.username) newErrors.username = "Username is required.";
          if (!formData.email || !emailRegex.test(formData.email))
            newErrors.email = "Enter a valid email address.";
          if (!formData.phone || !phoneRegex.test(formData.phone))
            newErrors.phone = "Enter a valid 10-digit phone number.";
          if (!formData.password || formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };

        const [ferrors, setfErrors] = useState({});
        const validateForgotForm = () => {
          const newErrors = {};
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
          // Validate email
          if (!formDataF.email || !emailRegex.test(formDataF.email)) {
            newErrors.email = "Enter a valid email address.";
          }
        
          // Validate password
          if (!formDataF.password || formDataF.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
          }
        
          // Validate confirm password
          if (formDataF.password !== formDataF.confirmpassword) {
            newErrors.confirmpassword = "Passwords do not match.";
          }
        
          // Set errors and return validity
          setfErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };
        


        const [lerrors, setlErrors] = useState({});

const validateloginForm = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Email validation
  if (!formDataL.email || !emailRegex.test(formDataL.email)) {
    newErrors.email = "Enter a valid email address.";
  }

  // Password validation
  if (!formDataL.password || formDataL.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
  }

  // Update errors state
  setlErrors(newErrors);

  // Return true if no errors, otherwise false
  return Object.keys(newErrors).length === 0;
};

const handleLoginSubmit = async (e) => {
  e.preventDefault();

  // Validate login form
  if (validateloginForm()) { // Corrected: Call the function
    try {
      // Make POST request to the login endpoint
      const response = await axios.post(
        "https://lemonprocurement.onrender.com/login",
        formDataL
      );

      const { msg, email } = response.data;

      // Check if login is successful
      if (msg === "login successful") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(email.email));

        // Redirect to home page
        window.location.href = "/";
      } else {
        // Handle unsuccessful login case
        Swal.fire({
          title: "Login unsuccessful!",
          text: "Check your details and try again.",
          icon: "error",
        });
      }
    } catch (error) {
      // Log the error and show user feedback
      console.error("Error occurred while logging in:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while logging in. Please try again later.",
        icon: "error",
      });
    }
  }
};

    const handleSignupSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          // Show a loader (optional)
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we create your account.",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
    
          // Make the POST request
          const response = await axios.post(
            "https://lemonprocurement.onrender.com/signup",
            formData // Pass formData directly
          );
    
          // Show success message
          Swal.fire({
            title: "Success",
            text: response.data.msg || "Account created successfully!",
            icon: "success",
          });
    
          // Reset form or navigate to login
          setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
          });
          setCurrentView("login");
        } catch (error) {
          // Handle and display server error
          console.error("Error occurred during signup:", error);
    
          let errorMessage = "An error occurred while signing up. Please try again later.";
          if (error.response && error.response.data && error.response.data.msg) {
            errorMessage = error.response.data.msg;
          }
    
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
          });
        }
      }
    };
    
    const handleForgotSubmit = (e) => {
      e.preventDefault();
      if(validateForgotForm()){
      axios.put('https://lemonprocurement.onrender.com/forgot', {formDataF})
          .then((res) => {
              Swal.fire({
                  title: "Success",
                  text: res.data.msg,
                  icon: "success"
              });
              setCurrentView('login')
          })
          .catch((error) => {
              console.error("Error occurred during signup:", error);
              Swal.fire({
                  title: "Error",
                  text: "An error occurred while signing up. Please try again later.",
                  icon: "error"
              });
          });
        }
  };

    return (
        <div className="container mx-auto px-4 py-6">
            {currentView === 'login' && (
                <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg overflow-hidden p-8 md:p-12">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                  Login to Your Account
                </h1>
                <div className="space-y-5">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full p-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-400`}
                    onChange={(e) => setFormDataL({ ...formDataL, email: e.target.value })}
                    value={formDataL.email}
                  />
                  {lerrors.email && <p className="text-red-500 text-sm mt-1">{lerrors.email}</p>}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full p-3 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-400`}
                    onChange={(e) => setFormDataL({ ...formDataL, password: e.target.value })}
                    value={formDataL.password}
                  />
                  {lerrors.password && (
                    <p className="text-red-500 text-sm mt-1">{lerrors.password}</p>
                  )}
                </div>


                <div className="mt-4">
                  <button
                    onClick={() => setCurrentView("forgot")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Forgotten password?
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={handleLoginSubmit}
                  >
                    Login
                  </button>
                </div>
                <p className="mt-6 text-center text-gray-600">
                  Not registered yet?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </div>
              </div>
              
              
            )}

            {currentView === 'signup' && (
               <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg overflow-hidden p-8 md:p-12">
               <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                 Create Your Account
               </h1>
               <div className="space-y-5">
                 {/* Username Field */}
                 <div className="relative">
                   <input
                     type="text"
                     placeholder="User Name"
                     className={`w-full p-3 rounded-lg border ${
                       errors.username ? "border-red-500" : "border-gray-300"
                     } focus:outline-none focus:ring-2 focus:ring-green-400`}
                     onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                     required
                   />
                   <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                   {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                 </div>
           
                 {/* Email Field */}
                 <div className="relative">
                   <input
                     type="email"
                     placeholder="Email Address"
                     className={`w-full p-3 rounded-lg border ${
                       errors.email ? "border-red-500" : "border-gray-300"
                     } focus:outline-none focus:ring-2 focus:ring-green-400`}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     required
                   />
                   <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                 </div>
           
                 {/* Phone Field */}
                 <div className="relative">
                   <input
                     type="text"
                     placeholder="Phone Number"
                     className={`w-full p-3 rounded-lg border ${
                       errors.phone ? "border-red-500" : "border-gray-300"
                     } focus:outline-none focus:ring-2 focus:ring-green-400`}
                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                     required
                   />
                   <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                   {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                 </div>
           
                 {/* Password Field */}
                 <div className="relative">
                   <input
                     type="password"
                     placeholder="Password"
                     className={`w-full p-3 rounded-lg border ${
                       errors.password ? "border-red-500" : "border-gray-300"
                     } focus:outline-none focus:ring-2 focus:ring-green-400`}
                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                     required
                   />
                   <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                   {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                 </div>
               </div>
           
               {/* Submit Button */}
               <div className="mt-8">
                 <button
                   type="button"
                   className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                   onClick={handleSignupSubmit}
                 >
                   Create Your Account
                 </button>
               </div>
           
               {/* Login Link */}
               <p className="mt-6 text-center text-gray-600">
                 Already have an account?{" "}
                 <button
                   onClick={() => setCurrentView("login")}
                   className="text-green-500 hover:text-green-600 font-medium hover:underline"
                 >
                   Log In
                 </button>
               </p>
             </div>
           
            )}

            {currentView === 'forgot' && (
                <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg overflow-hidden p-8 md:p-12">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                  Change your Password
                </h1>
                <div className="space-y-5">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onChange={(e) => setFormdataF({ ...formDataF, email: e.target.value })}
                      required
                    />
                    <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                    {ferrors.email && <p className="text-red-500 text-sm mt-1">{ferrors.email}</p>}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onChange={(e) => setFormdataF({ ...formDataF, password: e.target.value })}
                      required
                    />
                    <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                    {ferrors.password && <p className="text-red-500 text-sm mt-1">{ferrors.password}</p>}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onChange={(e) => setFormdataF({ ...formDataF, confirmpassword: e.target.value })}
                      required
                    />
                    <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500">*</span>
                    {ferrors.confirmpassword && <p className="text-red-500 text-sm mt-1">{ferrors.confirmpassword}</p>}
                  </div>
                </div>
              
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentView("login")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={handleForgotSubmit}
                  >
                    Change Password
                  </button>
                </div>
                <p className="mt-6 text-center text-gray-600">
                  Not registered yet?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </div>
              
            )}
        </div>
    );
}

export default SignIn;
