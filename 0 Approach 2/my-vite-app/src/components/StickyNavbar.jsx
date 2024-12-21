import React from "react";
import { Navbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Import Link for navigation

export function StickyNavbar({ isAuthenticated, login, logout }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 960); // Check screen size for mobile

  // Update the screen size state on window resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-normal">
        <Link to="/" className="flex items-center">Home</Link>
      </li>
      <li className="p-1 font-normal">
        <Link to="/faq" className="flex items-center">FAQ</Link>
      </li>
      <li className="p-1 font-normal">
        <Link to="/features" className="flex items-center">Features</Link>
      </li>
      <li className="p-1 font-normal">
        <Link to="/checkdata" className="flex items-center">Check Data</Link>
      </li>
    </ul>
  );

  const authButtons = (
    <div className="flex items-center gap-x-1">
      {isAuthenticated ? (
        <Button variant="text" size="sm" onClick={logout}>
          <span>Logout</span>
        </Button>
      ) : (
        <>
          <Button variant="text" size="sm" onClick={login}>
            <span>Login</span>
          </Button>
          <Button variant="gradient" size="sm" onClick={login}>
            <span>Sign in</span>
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="mr-4 cursor-pointer py-1.5 font-medium">
            Material Tailwind
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="mr-4 hidden lg:block">
              {navList}
              {authButtons}
            </div>
          )}

          {/* Mobile Menu Toggle Icon */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Mobile Navigation with Collapse */}
        {isMobile && (
          <Collapse open={openNav}>
            {navList}
            {authButtons}
          </Collapse>
        )}
      </Navbar>
    </div>
  );
}
