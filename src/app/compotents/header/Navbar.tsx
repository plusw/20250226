import Link from "next/link";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切换菜单展开/收起状态
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="navbar">
        <Link href="" className="logo">
          <img src="logo.svg" className="logo_image" alt="Icon" />
          <p>PDF.ai</p>
        </Link>

        <div className="links">
          {/* 汉堡菜单按钮 */}
          <button
            className="menu-button lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="text-2xl">☰</span> {/* 简单的汉堡菜单图标 */}
          </button>

          {/* 导航链接，屏幕宽度大于 1024px 时显示 */}
          <div
            className={`links-container allLinks ${
              isMenuOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <Link href="/" className="a_link">
              Pricing
            </Link>
            <Link href="/" className="a_link">
              Chrome extension
            </Link>
            <Link href="/" className="a_link">
              Use cases
            </Link>
            <div>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium">
                <span>
                  <img
                    src="https://hatscripts.github.io/circle-flags/flags/us.svg"
                    alt="English"
                    className="w-6 h-6 rounded-full"
                  ></img>
                </span>
                <span className="font-medium">EN</span>
              </button>
            </div>
            <Link href="/" className="a_link">
              Get started →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
