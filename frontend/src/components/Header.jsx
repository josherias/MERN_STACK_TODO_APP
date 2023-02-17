const Header = ({ openSidebar, setOpenSidebar, onLogout, user }) => {
  return (
    <header className="bg-white w-[100%] flex h-[70px] px-2  items-center">
      <div className="flex">
        {!openSidebar && (
          <svg
            xlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer  hover:bg-gray-100 rounded-md"
            onClick={() => setOpenSidebar(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex gap-1 items-center cursor-pointer text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="hidden md:block">{user.name}</span>
        </div>

        <div
          className="flex gap-1 items-center cursor-pointer text-gray-700 mr-3"
          onClick={onLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <span className="hidden md:block">Logout </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
