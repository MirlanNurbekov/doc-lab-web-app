import React, { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../../models/Contact";
import flag_kyrgyz from "../../assets/img/kyrgyz.png";
import flag_russian from "../../assets/img/russian.png";
import flag_usa from "../../assets/img/usa.png";
import line_header from "../../assets/img/Line_header.png";
import setting_icon from "../../assets/img/setting_header.png";
import "./Navbar.css"; 

// Flag data with language codes
const flags = [
  { id: "kyrgyz", img: flag_kyrgyz, alt: "Kyrgyz Flag", language: "ky" },
  { id: "russian", img: flag_russian, alt: "Russian Flag", language: "ru", default: true },
  { id: "usa", img: flag_usa, alt: "USA Flag", language: "en" },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFlagsDropdown, setShowFlagsDropdown] = useState(false);
  const [currentFlag, setCurrentFlag] = useState(flags.find(flag => flag.default));
  const [dropdownFlags, setDropdownFlags] = useState(flags.filter(flag => !flag.default));
  const [currentLanguage, setCurrentLanguage] = useState(currentFlag.language);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const toggleFlagsDropdown = () => {
    setShowFlagsDropdown(!showFlagsDropdown);
  };

  const selectFlag = (selectedId) => {
    const newCurrent = flags.find(flag => flag.id === selectedId);
    setCurrentFlag(newCurrent);
    setDropdownFlags(flags.filter(flag => flag.id !== selectedId));
    setCurrentLanguage(newCurrent.language);
    setShowFlagsDropdown(false);
  };

  // Mapping link texts based on current language
  const linkTexts = {
    home: { en: "Home", ru: "Главная" , ky: "Башкы бет"},
    about: { en: "About Us", ru: "О нас", ky: "Биз жөнүндө"},
    services: { en: "Services", ru: "Услуги", ky: "Кызматтар" },
    specialists: { en: "Specialists", ru: "Специалисты", ky: "Адистер"  },
    vacancies: { en: "Vacancies", ru: "Вакансии", ky: "Вакансиялар"  },
  };

  const getLinkText = (key) => linkTexts[key][currentLanguage];

  return (
    <div className="navbar fixed w-full z-10 text-white">
      <div>
        <div className="navbar-content flex flex-row justify-between p-5 md:px-32 px-5 backdrop-blur-md bg-black/50 bg-backgroundColor shadow-[rgb(37,37,37)_100px_3px_8px]">
          <div className="flex flex-row items-center cursor-pointer">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className="text-2xl font-semibold">DOCLAB</h1>
            </Link>
          </div>
          <nav className="navbar-links hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="home" spy={true} smooth={true} duration={500} className="hover:text-bgvioletColor transition-all cursor-pointer">
              {getLinkText("home")}
            </Link>
            <Link to="about" spy={true} smooth={true} duration={500} className="hover:text-bgvioletColor transition-all cursor-pointer">
              {getLinkText("about")}
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className="hover:text-bgvioletColor transition-all cursor-pointer">
              {getLinkText("services")}
            </Link>
            <Link to="doctors" spy={true} smooth={true} duration={500} className="hover:text-bgvioletColor transition-all cursor-pointer">
              {getLinkText("specialists")}
            </Link>
            <Link to="blog" spy={true} smooth={true} duration={500} className="hover:text-bgvioletColor transition-all cursor-pointer">
              {getLinkText("vacancies")}
            </Link>

            <div className="relative flags-dropdown" onClick={toggleFlagsDropdown}>
              <img src={currentFlag.img} alt="Selected Flag" className="w-10 cursor-pointer" />
              {showFlagsDropdown && (
                <div className="flags-dropdown-content">
                  {dropdownFlags.map((flag) => (
                    <img key={flag.id} src={flag.img} alt={flag.alt} className="flag" onClick={() => selectFlag(flag.id)} />
                  ))}
                </div>
              )}
            </div>
          </nav>

          {showForm && <Contact closeForm={closeForm} />}

          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link to="home" spy={true} smooth={true} duration={500} className="hover:text-hoverColor transition-all cursor-pointer" onClick={closeMenu}>
            {getLinkText("home")}
          </Link>
          <Link to="about" spy={true} smooth={true} duration={500} className="hover:text-hoverColor transition-all cursor-pointer" onClick={closeMenu}>
            {getLinkText("about")}
          </Link>
          {/* Additional mobile menu items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
