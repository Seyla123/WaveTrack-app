import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";

const navigation = [
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <FolderIcon />,
    },
    {
        segment: "session",
        title: "Sessions",
        icon: <FolderIcon />,
    },
    {
        segment: "student",
        title: "Students",
        icon: <FolderIcon />,
        children: [
            {
                segment: "lord-of-the-rings",
                title: "Lord of the Rings",
                icon: <DescriptionIcon />,
            },
            {
                segment: "harry-potter",
                title: "Harry Potter",
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: "subject",
        title: "Subjects",
        icon: <FolderIcon />,
    },
];

const Layout = ({ children , theme}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => navigate(path),
        };
    }, [location, navigate]);
    return (
        <AppProvider navigation={navigation} router={router} theme={theme}>
            {children}
        </AppProvider>
    );
};

export default Layout;
