import Navbar from "./Navbar";

function Layout({ children }) {

    return (
        <>
            <Navbar />

            <div
                className="container-fluid"
                style={{
                    padding: "30px",
                    background: "#f4f6f9",
                    minHeight: "100vh"
                }}
            >
                {children}
            </div>
        </>
    );

}

export default Layout;