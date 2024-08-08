import React, { Profiler } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom pages
import { Home } from "./pages/Home.jsx";
import { ContactListHome } from "./pages/ContactListHome.jsx";
import { NewContact } from "./pages/NewContact.jsx";
import { Edit } from "./pages/Edit.jsx"
import { Error404 } from "./pages/Error404.jsx";
import { People } from "./pages/People.jsx";
import { Vehiculos } from "./pages/Vehiculos.jsx";
import { Planets } from "./pages/Planets.jsx";
import { DetailPeople } from "./pages/DetailPeople.jsx";
import { Species } from "./pages/Species.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Logout } from "./component/Logout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

// Create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<ContactListHome />} path="/contact-list" />
                        <Route element={<Edit />} path="/edit" />
                        <Route element={<NewContact />} path="/new-contact" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Error404 />} path="*" />
                        <Route element={<People />} path="/people" />
                        <Route element={<Vehiculos />} path="/vehiculos" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<DetailPeople />} path="/detail-people" />
                        <Route element={<Species />} path="/species" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Logout />} path="/logout" />
                        <Route element={<Dashboard />} path="/dashboard" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
