import React from "react";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function SessionCreatePage() {
  const [session, setSession] = useState({
    teacher: "",
    period: "",
    class: "",
    subject: "",
    dow: "",
  });
  const createSession = async () => {
    try {
      const response = await axios.post("http://localhost:3000/session");
    } catch (error) {
      console.log(error);
    }
  };

  // MUI

  const teachers = [
    {
      value: "teacher1",
      label: "Smey",
    },
    {
      value: "teacher2",
      label: "Mary",
    },
    {
      value: "teacher3",
      label: "Berry",
    },
  ];

  const period = [
    {
      value: "",
      label: "7:00 - 8:00",
    },
    {
      value: "",
      label: "8:10 - 9:00",
    },
    {
      value: "",
      label: "9:10 - 10:00",
    },
  ];

  const classes = [
    {
      value: "",
      label: "12A",
    },
    {
      value: "",
      label: "12B",
    },
    {
      value: "",
      label: "12C",
    },
  ];

  const subject = [
    {
      value: "",
      label: "Math",
    },
    {
      value: "",
      label: "Khmer",
    },
    {
      value: "",
      label: "English",
    },
  ];
  const dow = [
    {
      value: "",
      label: "Monday",
    },
    {
      value: "",
      label: "Tuesday",
    },
    {
      value: "",
      label: "Wednesday",
    },
  ];
  return (
    <div>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "60ch" } }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* Teacher */}
          <div>
            <h4>Teacher</h4>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {teachers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {/* Period */}
          <div>
            <h4>Class Period</h4>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {period.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>

        <Box  sx={{ display: "flex", flexDirection: "row" }}>
          {/* Classes */}
          <div>
            <h4>Class</h4>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {classes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {/* Subject */}
          <div>
            <h4>Class</h4>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {subject.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>

        {/* Dow */}
        <div>
          <h4>Day of Week</h4>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="EUR"
            helperText="Please select your currency"
          >
            {dow.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </div>
  );
}

export default SessionCreatePage;
