import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { databases } from "../appwrite/appwriteConfig";
import { useTheme } from "./userProvider";
import { AppwriteException } from "appwrite";
import dayjs from "dayjs";

const TabChange = ({ date }) => {
  const { setUserDetails, userDetails } = useTheme();
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [isInTimeExist, setInTimeExist] = useState(false);
  const [isOutTimeExist, setOutTimeExist] = useState(false);
  const [documentId, setDocumentId] = useState("");
  console.log("tabchange", userDetails);

  const getCurrentTimeIn12HourFormat = (date) => {
    const dayjsDate = dayjs(date);
    const formattedHours = dayjsDate.format("hh");
    const formattedMinutes = dayjsDate.format("mm");
    const ampm = dayjsDate.format("A");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    const newDocumentId = `${userDetails.name}_${dayjs(date).format(
      "YYYY-MM-DD"
    )}`;
    setDocumentId(newDocumentId);
  }, [date]);

  useEffect(() => {
    const fetchTimeEntry = async () => {
      console.log("use effect is called");
      if (!date || !userDetails.name) return;
      try {
        const response = await databases.getDocument(
          "662fa5010027e134272e",
          "662fa5200000bb3dcf24",
          documentId
        );
        if (response) {
          setInTime(response.inTime);
          setInTimeExist(true);
          const currentTime = getCurrentTimeIn12HourFormat(date);
          setOutTime(response.outTime || currentTime); // If outTime exists, set it, otherwise set an empty string
          setOutTimeExist(!!response.outTime); // Set outTimeExist based on whether outTime exists or not
          console.log("response tabchange", response.inTime);
          //   setInTime(response.inTime);
        }
      } catch (error) {
        if (error instanceof AppwriteException) {
          setInTimeExist(false);
          setInTime(() => getCurrentTimeIn12HourFormat(date));
          console.log(documentId);
        }
      }
    };

    fetchTimeEntry();
  }, [documentId, userDetails.name]);

  const handleInTimeSubmit = async (event) => {
    event.preventDefault();
    if (!isInTimeExist) {
      const currentTime = getCurrentTimeIn12HourFormat(date);
      setInTime(currentTime);
      console.log("entered inside the in time");
      try {
        console.log("entered inside the try block of in time");
        const response = await databases.createDocument(
          "662fa5010027e134272e",
          "662fa5200000bb3dcf24",
          documentId,
          {
            userId: userDetails.$id,
            userName: userDetails.name,
            date: `${dayjs(date).format("YYYY-MM-DD")}`,
            inTime: currentTime,
          }
        );
        setInTimeExist(true);
        console.log("Document created:", response);
      } catch (error) {
        console.error("Error submitting In Time:", error);
      }
    }
  };

  const handleOutTimeSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if the conditions are met for submitting out time
      console.log(isInTimeExist);
      console.log(outTime);
      if (!isOutTimeExist) {
        const currentTime = getCurrentTimeIn12HourFormat(date);
        setOutTime(currentTime);

        // Construct documentId
        const newDocumentId = `${userDetails.name}_${dayjs(date).format(
          "YYYY-MM-DD"
        )}`;
        setDocumentId(newDocumentId);

        // Make the API call to update out time
        const response = await databases.updateDocument(
          "662fa5010027e134272e",
          "662fa5200000bb3dcf24",
          newDocumentId,
          { outTime: currentTime }
        );

        console.log("Document updated:", response);
        setOutTimeExist(true); // Update state indicating out time is submitted
      } else {
        console.log("Conditions not met for submitting out time.");
      }
    } catch (error) {
      console.error("Error submitting Out Time:", error);
      // Handle specific errors if needed
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value="OFFICE"
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="OFFICE" label="OFFICE" />
        </Tabs>
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
          {!isInTimeExist ? (
            <>
              <form onSubmit={handleInTimeSubmit}>
                <label>
                  In Time:
                  <input
                    type="text"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    readOnly
                  />
                </label>
                <button type="submit">Submit In Time</button>
              </form>
            </>
          ) : (
            <>
              <div>
                <span>In Time:</span>
                <span>{inTime}</span>
              </div>
              {!isOutTimeExist ? (
                <form onSubmit={handleOutTimeSubmit}>
                  <label>
                    Out Time:
                    <input
                      type="text"
                      value={outTime}
                      onChange={(e) => setOutTime(e.target.value)}
                      readOnly
                    />
                  </label>
                  <button type="submit">Submit Out Time</button>
                </form>
              ) : (
                <div>
                  <span>Out Time:</span>
                  <span>{outTime}</span>
                </div>
              )}
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default TabChange;
