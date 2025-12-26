import { Link } from 'react-router-dom';
import UserMenu from './UserMenu.jsx';
import Sidebar from './SideBar.jsx';
import SearchBar from './SearchBar.jsx';
const Header = () => {
  return (
    <div className="px-20 w-full max-w-full flex justify-between items-center bg-[#360185] p-5 fixed  fixed-top z-10">
      {/* logo */}
      <div className="w-50 h-10 flex items-center">
        <Link to="/" className="ml-1 font-bold text-xl text-black focus:outline-2  focus:outline-black leading-12">
        <i className="fa-solid fa-graduation-cap text-[#F4B342] mr-2"></i>
          <span className="text-[#F4B342]">TVULEARN</span>
        </Link>
      </div>

      {/* search bar */}
      <div className="flex-1 flex justify-center mx-4">
        <SearchBar />
      </div>
      {/* user icon */}
      {/* When login */}
      <div className=" items-center space-x-4 w-50 justify-end flex z-20">
        <UserMenu />
      </div>
       {/* side bar*/}
      
    </div>
  )
}

export default Header;
