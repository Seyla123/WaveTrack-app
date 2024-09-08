import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import Logo from '../../assets/images/Logo.png';
import theme from '../../styles/theme';
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
} from '@mui/icons-material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Box } from '@mui/system';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

const navigation = [
    { kind: 'header', title: 'Menu' },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <HomeIcon />,
    },
    {
        segment: 'dashboard/sessions',
        title: 'Session',
        icon: <CalendarMonthIcon />,
    },
    {
        segment: 'dashboard/classes',
        title: 'Class',
        icon: <ClassIcon />,
    },
    {
        segment: 'dashboard/subjects',
        title: 'Subject',
        icon: <SubjectIcon />,
    },
    {
        segment: 'dashboard/students',
        title: 'Student',
        icon: <StudentIcon />,
    },
    {
        segment: 'dashboard/teachers',
        title: 'Teacher',
        icon: <TeacherIcon />,
    },
    {
        segment: 'dashboard/class-periods',
        title: 'Class Period',
        icon: <ClassPeriodIcon />,
    },
    {
        segment: 'dashboard/reports',
        title: 'Report',
        icon: <ReportGmailerrorredIcon />,
        children: [
            {
                segment: 'attendance',
                title: 'Attendance',
                icon: <ChecklistIcon />,
            },
        ],
    },

    { kind: 'divider' },

    { kind: 'header', title: 'General' },

    {
        segment: 'dashboard/settings',
        title: 'Settings',
        icon: <SettingsIcon />,
        children: [
            {
                segment: 'account',
                title: 'Account',
                icon: <Person />,
            },
        ],
    },
];

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = React.useState({
        user: {
            name: 'Doggo',
            email: 'doggo@gmail.com',
            image: 'https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg',
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Doggo',
                        email: 'doggo@gmail.com',
                        image: 'https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: path => navigate(path),
        };
    }, [location, navigate]);
    // Determine if the dashboard should be shown
    const showDashboard = !['/login', '/signup', '/forgot-password', '/reset-password', '/change-password'].includes(location.pathname);

    return (
        <AppProvider
            branding={{
                title: '',
                logo: <img src={Logo} alt='WaveTrack' />,
            }}
            navigation={navigation}
            router={router}
            theme={theme}
            session={session}
            authentication={authentication}
        >
            <Box padding={showDashboard? 2 : 0}>
                {showDashboard ? (
                    // Render the dashboard or other components here
                    <DashboardLayout>{children}</DashboardLayout>
                ) : (
                    // Render other components or nothing based on your requirements
                    children
                )}
                
            </Box>
        </AppProvider>
    );
};

export default Layout;
