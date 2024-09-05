import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import theme from "../../styles/theme";
import { Button } from "@mui/material";

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

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = React.useState({
        user: {
            name: "Doggo",
            email: "doggo@gmail.com",
            image: "https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg",
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: "Doggo",
                        email: "doggo@gmail.com",
                        image: "https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg",
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
            navigate: (path) => navigate(path),
        };
    }, [location, navigate]);
    return (
        <AppProvider
            navigation={navigation}
            router={router}
            theme={theme}
            session={session}
            authentication={authentication}
        >
            {children}
            <Button>Chllo</Button>
        </AppProvider>
    );
};

export default Layout;
