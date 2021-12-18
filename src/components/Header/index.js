import React from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { RiGlobeFill, RiMenu5Line } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./styles.css";

export default function Header() {
  return (
    <div>
      <nav className="nav-top">
        <img
          src="https://cdn.worldvectorlogo.com/logos/hubspot-1.svg"
          alt="logo-mobile"
          class="logo-mobile"
        />
        <IconContext.Provider value={{ color: "#33475b", size: 18 }}>
          <div class="navbar-left">
            <ul>
              <li className="option globe-option">
                <RiGlobeFill />
                <a href="/">English</a>
                <MdKeyboardArrowDown />
              </li>
              <li className="option contact-option">
                <TiUser />
                <a href="/">Contact Sales</a>
              </li>
            </ul>
          </div>
        </IconContext.Provider>
        <div class="navbar-right">
          <ul>
            <li>
              <IconContext.Provider value={{ color: "#43a5be", size: 18 }}>
                <a href="/">
                  <FaSearch />
                </a>
              </IconContext.Provider>
            </li>
            <li>
              <a href="/">Log in</a>
            </li>
            <li>
              <a href="/">Customer Support</a>
            </li>
            <li className="option about-option">
              <a href="/">About</a>
              <IconContext.Provider value={{ color: "#33475b", size: 18 }}>
                <MdKeyboardArrowDown />
              </IconContext.Provider>
            </li>
          </ul>
        </div>
        <IconContext.Provider value={{ color: "#33475b", size: 40 }}>
          <RiMenu5Line className="menu" />
        </IconContext.Provider>
      </nav>
      <nav className="nav-bottom">
        <IconContext.Provider value={{ color: "#33475b", size: 18 }}>
          <div class="navbar-left second-left">
            <a href="/">
              <img
                src="https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-logo.svg"
                alt="logo"
                class="logo"
              />
            </a>
            <ul>
              <li className="option software-option">
                <a href="/">Software</a>
                <MdKeyboardArrowDown />
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
              <li className="option resources-option">
                <a href="/">Resources</a>
                <MdKeyboardArrowDown />
              </li>
            </ul>
          </div>
        </IconContext.Provider>
        <div class="navbar-right second-right">
          <ul>
            <li>
              <button class="primary-button">Start free or get a demo</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="title">
        <h1>Invoice Template Generator</h1>
        <h5>
          Fill in your business details in the invoice template below to create
          a professional invoice for your customers.
        </h5>
      </div>
    </div>
  );
}
