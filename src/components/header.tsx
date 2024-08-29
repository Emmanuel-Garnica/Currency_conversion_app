import AppLogo from '../assets/images/TP-exchanges-logo.png';

const Header = () => {
  return (
    
    <nav className="bg-gradient-to-r from-[#7A2180] via-[#7A2180] to-[#E40276] border-gray-200 w-full py-0 lg:py-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto md:justify-between">
        <picture className="flex items-center gap-3 color rtl:space-x-reverse">
            <h1 className='sr-only'>TP Exchange</h1>
            <img src={AppLogo} className="h-16" alt="Librería Jelou Logo" title="Librería Jelou"/>
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-[#7A2180] via-[#E40276] to-white bg-clip-text text-transparent">TP Exchange</span>
        </picture>
      </div>
    </nav>

  )
}

export default Header;