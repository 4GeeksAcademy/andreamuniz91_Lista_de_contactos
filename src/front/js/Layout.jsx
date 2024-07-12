import React from "react";
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
                        <Route element={<NewContact />} path="/contact-list/new" />
                        <Route element={<Home />} path="/" />
                        <Route element={<h1>Not found!</h1>} path="*"/> // Error404
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
