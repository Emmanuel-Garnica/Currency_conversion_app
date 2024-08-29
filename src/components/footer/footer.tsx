import AppLogo from "../../assets/images/TP-exchanges-logo.png";
import { Icons } from "../ui/icons";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-r from-[#7A2180] via-[#7A2180] to-[#E40276]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <picture className="flex items-center">
              <img
                src={AppLogo}
                className="h-16 me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-white text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-red via-primary to-secondary bg-clip-text text-transparent">
                TP Exchange
              </span>
            </picture>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase">
                Resources
              </h2>
              <ul className="text-white italic">
                <li>
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    className="hover:text-[#030220] hover:underline"
                  >
                    ReactJS
                  </a>
                </li>
                <li className="my-4">
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    className="hover:text-[#030220] hover:underline"
                  >
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a
                    href="https://zustand.docs.pmnd.rs/getting-started/introduction"
                    target="_blank"
                    className="hover:text-[#030220] hover:underline"
                  >
                    Zustand
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase">
                Follow us
              </h2>
              <ul className="text-white italic">
                <li className="mb-4">
                  <a
                    href="https://github.com/Emmanuel-Garnica"
                    target="_blank"
                    className="hover:text-[#030220] hover:underline"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2024 Emmanuel Garnica.
          </span>
          <div className="flex mt-4 justify-center sm:mt-0">
            <a href="https://www.linkedin.com/in/emmanuel-garnica/" target="_blank" className="text-white hover:text-[#030220]">
              <Icons.linkedIn />
              <span className="sr-only">LinkedIn account</span>
            </a>
            <a
              href="https://github.com/Emmanuel-Garnica"
              target="_blank"
              className="text-white hover:text-[#030220] ms-5"
            >
              <Icons.gitHub />
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
