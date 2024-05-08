import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useTheme } from "./userProvider";
import { AppwriteException } from "appwrite";
import dayjs from "dayjs";
import { Query } from "appwrite";

const AttendanceList = () => {
  const { setUserDetails, userDetails } = useTheme();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  //   const currentMonthFirstDate = dayjs().startOf("month").format("YYYY-MM-DD");
  //   const currentMonthLastDate = dayjs().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {}, []);

  const getDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = dayjs(startDate);
    const lastDate = dayjs(endDate);

    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  useEffect(() => {
    const fetchAttendanceRecords = async (startDate, endDate) => {
      const datesInRange = getDateRange(startDate, endDate);
      console.log(datesInRange);

      try {
        // Construct filter conditions
        const filters = [];
        if (startDate) {
          filters.push(`date>=${dayjs(startDate).format("YYYY-MM-DD")}`);
        }
        if (endDate) {
          filters.push(`date<=${dayjs(endDate).format("YYYY-MM-DD")}`);
        }

        // Fetch attendance records from the database based on the date range
        const response = await databases.listDocuments(
          "662fa5010027e134272e",
          "662fa5200000bb3dcf24",
          [
            Query.equal("userName", userDetails.name),
            Query.equal("date", datesInRange),
            Query.orderAsc("date"),
          ]
        );
        if (response && response.documents) {
          setAttendanceRecords(response.documents);
        }
      } catch (error) {
        if (error instanceof AppwriteException) {
          console.error("Error fetching attendance records:", error);
        }
      }
    };
    fetchAttendanceRecords(startDate, endDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h2>Attendance List</h2>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record.$id}>
            <strong>Date:</strong> {dayjs(record.date).format("YYYY-MM-DD")}{" "}
            <br />
            <strong>In Time:</strong> {record.inTime} <br />
            <strong>Out Time:</strong> {record.outTime || "N/A"} <br />
            <strong>Total Work Time:</strong>{" "}
            {record.outTime
              ? calculateWorkTime(record.inTime, record.outTime)
              : "N/A"}
            <br />
            <strong>Work Mode:</strong>{" "}
            {record.outTime
              ? calculateWorkMode(record.inTime, record.outTime)
              : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;

// Function to calculate total work time
const calculateWorkTime = (inTime, outTime) => {
  console.log(inTime, outTime);
  const startTime = dayjs(inTime, "hh:mm A");
  const endTime = dayjs(outTime, "hh:mm A");
  console.log("startTime", startTime, "endTime", endTime);
  const duration = endTime.diff(startTime, "minutes");
  console.log(duration);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} hours ${minutes} minutes`;
};

// Function to calculate work mode
const calculateWorkMode = (inTime, outTime) => {
  // You can define your logic to determine work mode here
  // For example, if the difference between in-time and out-time is more than a certain threshold, consider it as full-time
  // Otherwise, consider it as part-time or absent
};
