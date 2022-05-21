import { Link } from "react-router-dom";
import { CTA, SearchBox } from "components";
import "components/UI/Header/Header.css";
import { icon } from "data/Logo/logo";

export const Header = () => {
	return (
		<header className="header">
			<Link className="brand__text grid-center" to="/">
				<img className="logo__img" src={icon} alt="logo" />
				Quiz
			</Link>
			<CTA />
		</header>
	);
};
