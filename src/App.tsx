import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserProvider";
import AllHomes from "./pages/home-pages/AllHomes";
import HomeDetails from "./pages/home-pages/HomeDetails";
import CreateHome from "./pages/home-pages/CreateHome";
import EditHome from "./pages/home-pages/EditHome";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Rent from "./pages/Rent";
import Chat from "./pages/Chat";
import Meeting from "./pages/Meeting";
import GridLearn from "./pages/GridLearn";
import MeetingsScheduler from "./pages/MeetingsScheduler";
import PostListing from "./pages/PostLising";
import ForgotPassword from './pages/user/ForgotPassword';
import UserProfile from './pages/user/Profile';
import NewsPage from './pages/NewPage';
import NewsDetail from './pages/NewDetail';
import "./App.scss";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                    <MainApp />
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

function MainApp() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/'){
            navigate('/all-sell');
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/all-sell" element={<AllHomes />} />
                    <Route path="/all-rent" element={<AllHomes />} />
                    <Route path="/create-home" element={<CreateHome />} />
                    <Route path="/edit-home" element={<EditHome />} />
                    <Route path="/home-details">
                        <Route path=":homeId" element={<HomeDetails />} />
                    </Route>
                    <Route path="/chat">
                        <Route path=":chatPartnerId" element={<Chat />} />
                    </Route>
                    <Route path="/meeting">
                        <Route path=":meetingPartnerId/:homeId" element={<Meeting />} />
                    </Route>
                    <Route path="/meetings-scheduler" element={<MeetingsScheduler />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/grid" element={<GridLearn />} />
                    <Route path="/post-listing" element={<PostListing />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/news" >
                        <Route path="" element={<NewsPage />} />
                        <Route path=":id" element={<NewsDetail />} />
                    </Route>
                </Routes>
                <ToastContainer />
            </main>
            <Footer />
        </>
    );
}

export default App;