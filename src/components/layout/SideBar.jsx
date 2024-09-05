import React, { useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    Typography,
    Divider,
} from '@mui/material';
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
    Person,
} from "@mui/icons-material";

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

const navigation = [
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        segment: "session",
        title: "Sessions",
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
        children: [
            {
                segment: "class-periods",
                title: "Class Periods",
                icon: <ClassPeriodIcon />,
            },
            {
                segment: "report",
                title: "Report",
                icon: <Person />,
            },
        ],
    },
];

const drawerWidth = 240;

const SideBar = () => {
    const location = useLocation(); // Get the current location

    return (
        <>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', py: 6, px: 2 },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: "column", justifyContent: 'space-between', height: 1 }}>
                <Box>
                    <Typography variant='body1'>Menu</Typography>
                    <List>
                        {navigation.map((item) => {
                            const isActive = location.pathname.includes(item.segment); // Check if the current path includes the segment

                            return (
                                <Box key={item.segment}>
                                    <ListItem disablePadding>
                                        <Link to={`/${item.segment}`} style={{ textDecoration: 'none', width: '100%' }}>
                                            <Button 
                                                startIcon={item.icon} 
                                                size='large' 
                                                variant={isActive ? 'contained' : 'outlined'} // Set variant based on active state
                                                sx={{
                                                    boxShadow: "none", 
                                                    width: 1, 
                                                    display: 'flex', 
                                                    justifyContent: "start",
                                                    '&:hover': {
                                                        backgroundColor: isActive ? "primary.main" : "transparent", // Change background on hover
                                                    },
                                                    border: isActive ? '' : '1px solid #fff',
                                                    color: isActive ? '' : 'gray'
                                                }}
                                            >
                                                {item.title}
                                            </Button>
                                        </Link>
                                    </ListItem>
                                    {item.children && (
                                        <Collapse in={isActive} timeout="auto" unmountOnExit>
                                            <Box sx={{ pl: 2 }}>
                                                {item.children.map((child) => (
                                                    <ListItem key={child.segment} disablePadding>
                                                        <Link to={child.segment} style={{ textDecoration: 'none', width: '100%' }}>
                                                            <Button startIcon={child.icon} size='large' sx={{ boxShadow: "none", color: "#757575", width: 1, display: 'flex', justifyContent: "start" }}>
                                                                {child.title}
                                                            </Button>
                                                        </Link>
                                                    </ListItem>
                                                ))}
                                            </Box>
                                        </Collapse>
                                    )}
                                </Box>
                            );
                        })}
                    </List>
                </Box>
                <Box>
                    <Typography variant='body1'>General</Typography>
                    <List>
                        <ListItem disablePadding>
                            <Link to="/settings" style={{ textDecoration: 'none' }}>
                                <Button startIcon={<SettingsIcon />} size='large' sx={{ boxShadow: "none", color: "gray", width: 1, display: 'flex', justifyContent: "start" }}>Settings</Button>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/logout" style={{ textDecoration: 'none' }}>
                                <Button startIcon={<LogoutIcon />} size='large' sx={{ boxShadow: "none", color: "gray", width: 1, display: 'flex', justifyContent: "start" }}>Logout</Button>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Drawer>
        </>
    );
}

export default SideBar;

