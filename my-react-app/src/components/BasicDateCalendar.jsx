import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs"; // Import dayjs for handling dates
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TabChange from "../components/TabChange";

export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Set initial value to current date
  const [showForms, setShowForms] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForms(true);
    // console.log(date); // Show forms when a date is selected
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={selectedDate} onChange={handleDateChange} />
        </LocalizationProvider>
      </div>
      {showForms && (
        <div style={{ flex: 1 }}>
          <TabChange date={selectedDate} />
        </div>
      )}
    </div>
  );
}
