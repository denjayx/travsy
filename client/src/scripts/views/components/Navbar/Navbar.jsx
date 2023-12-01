import {useState} from "react";
import logo from "../../../../assets/logo.svg";
import Button from "../Buttons/Button";
import {NavLink} from "react-router-dom";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="container flex items-center justify-between p-6 gap-12">
			<div className="flex items-center">
				<NavLink to="/">
					<img src={logo} className="w-100 h-10 mr-2" alt="Logo" />
				</NavLink>
			</div>
			<div className="block lg:hidden text-primary-600">
				<button onClick={() => setIsOpen(!isOpen)} className="flex items-center p-1 border border-primary-300 rounded-lg text-black-500 hover:text-black-400">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
			</div>
			<div onClick={() => setIsOpen(!isOpen)} className={`lg:w-full justify-between absolute lg:static top-16 right-4 lg:flex lg:items-center max-lg:mt-4 ${isOpen ? "block" : "hidden"}`}>
				<ul className="flex max-lg:bg-gray-0 text-primary-700 max-lg:flex-col m-2 gap-1 lg:gap-8 max-lg:px-6 max-lg:py-4 max-lg:border max-lg:border-primary-300 rounded-xl">
					<li>
						<NavLink to="/" className="block py-3 rounded-xl px-6 lg:px-2">
							Beranda
						</NavLink>
					</li>
					<li>
						<NavLink to="/package" className="block py-3 rounded-xl px-6 lg:px-2">
							Paket Wisata
						</NavLink>
					</li>
					<li>
						<NavLink to="/history" className="block py-3 rounded-xl px-6 lg:px-2">
							Riwayat
						</NavLink>
					</li>
					<div className="flex flex-col md:hidden">
						<NavLink to="/login">
							<Button variant="text" className="">
								Masuk
							</Button>
						</NavLink>
						<NavLink to="/register">
							<Button variant="text" className="font-semibold">
								Buat Akun
							</Button>
						</NavLink>
					</div>
				</ul>
				<div className="flex flex-row max-md:hidden gap-2">
					<NavLink to="/login">
						<Button variant="primary">Masuk</Button>
					</NavLink>
					<NavLink to="/register">
						<Button variant="secondary">Buat Akun</Button>
					</NavLink>
				</div>
			</div>
		</nav>
	);
}
