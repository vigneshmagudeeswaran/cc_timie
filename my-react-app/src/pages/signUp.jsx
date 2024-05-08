import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await account.create(
        uuidv4(),
        user.email,
        user.password,
        user.name
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to signup. Please try again.");
    }
  };

  return (
    <div className="mac-book-pro-9">
      <div className="container">
        <div className="rectangle-1"></div>
        <div className="indias-first-end-to-end-event-experience-app">
          Code Crave Solutions pvt ltd
        </div>
        <img
          className="group-30"
          src="assets/vectors/Group30_x2.svg"
          alt="Group 30"
        />
      </div>
      <div className="group-101">
        <form onSubmit={signupUser}>
          <div className="group">
            <div className="get-started">Get Started</div>
            <div className="lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed"></div>
            <div className="group-4">
              <div className="email-address">Name</div>
              <div className="group-397">
                <input
                  className="sourabh-bankaalienbrains-in"
                  type="text"
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                />
              </div>

              <div className="email-address">Email Address</div>
              <div className="group-397">
                <input
                  className="sourabh-bankaalienbrains-in"
                  type="text"
                  placeholder="Enter your name"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="login">
              signup
            </button>
            <div className="error_message">{error}</div>
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
