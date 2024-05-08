import React, { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/appwriteConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    console.log("useEffect in UserProvider is running...");

    const fetchData = async () => {
      try {
        const response = await account.get();
        console.log("Response from account.get():", response);
        setUserDetails(response); // Assuming response contains the user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures the effect runs once on mount

  console.log("UserProvider is rendering...");

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(UserContext);
};
