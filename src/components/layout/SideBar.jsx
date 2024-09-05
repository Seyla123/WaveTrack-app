import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
    Home as HomeIcon,
    CalendarMonth as CalendarMonthIcon,
    Class as ClassIcon,
    Subject as SubjectIcon,
    School as StudentIcon,
    CoPresent as TeacherIcon,
    LibraryBooks as ClassPeriodIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import theme from "../../styles/theme";

const NAVIGATION = [
    {
        kind: "header",
        title: "Menu",
    },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        segment: "session",
        title: "Session",
        icon: <CalendarMonthIcon />,
    },
    {
        segment: "class",
        title: "Class",
        icon: <ClassIcon />,
    },
    {
        segment: "subject",
        title: "Subject",
        icon: <SubjectIcon />,
    },
    {
        segment: "students",
        title: "Students",
        icon: <StudentIcon />,
    },
    {
        segment: "teacher",
        title: "Teacher",
        icon: <TeacherIcon />,
    },
    {
        segment: "class-periods",
        title: "Class Periods",
        icon: <ClassPeriodIcon />,
    },
    {
        kind: "header",
        title: "Report",
    },
    {
        segment: "attendance",
        title: "Attendance",
        icon: <ExpandMoreIcon />,
    },
    {
        kind: "header",
        title: "General",
    },
    {
        segment: "settings",
        title: "Settings",
        icon: <SettingsIcon />,
    },
    {
        segment: "account",
        title: "Account",
        icon: <ExpandMoreIcon />,
    },
    {
        segment: "logout",
        title: "Logout",
        icon: <LogoutIcon />,
    },
];
const SideBar = ({ children }) => {
    return (
        <AppProvider
            theme={theme}
            navigation={NAVIGATION}
            branding={{
                logo: "",
                title: "WaveTrack",
            }}
        >
            {children}
        </AppProvider>
    );
};

export default SideBar;
