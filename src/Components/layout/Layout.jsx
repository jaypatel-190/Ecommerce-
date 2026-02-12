import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <div className="app-layout">
                <header role="banner">
                    <Navbar />
                </header>
                <main className="main-content min-h-screen" role="main">
                    {children}
                </main>
                <footer role="contentinfo">
                    <Footer />
                </footer>
            </div>
        </>
    );
}

export default Layout;