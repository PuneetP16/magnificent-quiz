import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "data/icons";
import {
	IcOutlineBookmarks,
	IcOutlineExplore,
	PhHeartDuotone,
} from "data/Icon";
import { ROUTES } from "utils/routes";

export const Aside = () => {
	return (
		<aside className="nav notes_nav">
			<ul className="nav__items">
				<Link to={ROUTES.home} className="nav__list_item">
					{bxIcons.home}
					<span className="nav__item">Home</span>
				</Link>

				<Link to={ROUTES.leaderboard} className="nav__list_item">
					<IcOutlineExplore />
					<span className="nav__item">Leaderboard</span>
				</Link>

				<Link to={ROUTES.category} className="nav__list_item">
					{bxIcons.playlist}
					<span className="nav__item">Category</span>
				</Link>
				<Link to={ROUTES.settings} className="nav__list_item">
					{bxIcons.history}
					<span className="nav__item">Settings</span>
				</Link>
				<Link to={ROUTES.profile} className="nav__list_item">
					{bxIcons.userCircle}
					<span className="nav__item">Profile</span>
				</Link>
			</ul>
		</aside>
	);
};
