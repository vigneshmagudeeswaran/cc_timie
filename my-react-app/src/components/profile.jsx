import React, { useContext } from "react";
import { useTheme } from "./userProvider";
const Profile = () => {
  const { userDetails, setUserDetails } = useTheme();

  const handleLogout = async () => {
    // Handle logout logic
  };
  console.log("userDetails", userDetails);
  return (
    <div>
      <h1>Welcome, {userDetails ? userDetails.name : "Anonymous"}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
