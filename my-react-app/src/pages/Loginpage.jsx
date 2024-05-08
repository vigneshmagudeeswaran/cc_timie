import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import "../assets/loginpage.css";
// Assuming 'account' is imported from somewhere to handle authentication

export default function Loginpage() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await account.createEmailPasswordSession(user.email, user.password);
      navigate("/dashboard");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="mac-book-pro-9">
      <div className="container">
        <div className="rectangle-1"></div>
        <div className="indias-first-end-to-end-event-experience-app">
          Code Crave Solutions Pvt Ltd
        </div>
        <img
          className="group-30"
          src="assets/vectors/Group30_x2.svg"
          alt="Group 30"
        />
      </div>
      <div className="group-101">
        <form onSubmit={handleSubmit}>
          <div className="group">
            <div className="get-started">Get Started</div>
            <div className="lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed"></div>
            <div className="group-4">
              <div className="email-address">Email Address</div>
              <div className="group-397">
                <input
                  className="sourabh-bankaalienbrains-in"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="group-399">
              <div className="password">Password</div>
              <div className="container-1">
                <input
                  className="container"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="group-96">
              <div className="group-95">
                <input type="checkbox" />
                <div className="remember-me">Remember me</div>
              </div>
              <div className="forgot-password">Forgot Password</div>
            </div>
            <button type="submit" className="login">
              Login
            </button>
            {error && <div className="error_message">{error}</div>}
            <span className="by-clicking-on-button-above-you-agrees-to-our-terms-of-use-and-privacy-policy">
              By clicking on button above, you agree to our terms of use and
              privacy policy
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
