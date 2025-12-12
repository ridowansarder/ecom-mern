import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full text-gray-500 mt-12">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <h1 className="text-2xl font-bold text-gray-800">SNORVO</h1>
          <p className="mt-3 text-sm">
            Snorvo is a fashion store that sells eco-friendly clothing and
            accessories. We believe in sustainability and want to make a
            positive impact on the planet.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-3 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-3 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+8801996610372</p>
              <p>ridwanzuraiz@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        &copy; {new Date().getFullYear()} SNORVO. All rights reserved.
      </p>
    </footer>
  );
}
