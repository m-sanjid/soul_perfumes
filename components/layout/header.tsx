import Link from "next/link";

const Header = () => {
  return (
    <nav className="h-16 z-50 fixed top-0 left-0 right-0">
      <div className="relative max-w-7xl w-full z-50 flex items-center justify-end h-26">
        <Link
          href={"/products"}
          className="px-3 py-2 font-semibold tracking-tight uppercase text-white hover:text-yellow-500 transition-all duration-300 ease-in-out hover:scale-105"
        >
          collections
        </Link>
      </div>
    </nav>
  );
};

export default Header;
