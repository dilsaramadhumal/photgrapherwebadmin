import NavBarProfileInfo from "./NavBarProfileInfo";

const NavBar = () => {
  return (
    <div 
      className="flex items-center justify-end w-full h-16 px-4 shadow-md"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <NavBarProfileInfo />
    </div>
  );
};

export default NavBar;