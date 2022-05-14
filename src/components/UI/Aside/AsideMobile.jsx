import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "data/icons";
import {
	IcOutlineBookmarks,
	IcOutlineExplore,
	PhHeartDuotone,
} from "data/Icon";
import { ROUTES } from "utils/routes";

export const AsideMobile = () => {
	return (
		<aside className="nav--mobile">
			<ul className="nav__items--mobile">
				<Link to={ROUTES.home} className="nav__list_item">
					{bxIcons.home}
				</Link>

				<Link to={ROUTES.leaderboard} className="nav__list_item">
					<IcOutlineExplore />
				</Link>

				<Link to={ROUTES.category} className="nav__list_item">
					{bxIcons.playlist}
				</Link>

				<Link to={ROUTES.settings} className="nav__list_item">
					{bxIcons.history}
				</Link>
				
				<Link to={ROUTES.profile} className="nav__list_item">
					{bxIcons.userCircle}
				</Link>
			</ul>
		</aside>
	);
};
