import { bxIcons } from "data/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBox.css";
import { useState } from "react";

export const SearchBoxMobile = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" ? "invisible" : "")();

	// const { filterDispatch, initialFilterState } = useFilter();

	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const onChangeSearchHandler = (e) => {
		setQuery(e.target.value);
	};

	// useEffect(() => {
	// 	if (query) {
	// 		filterDispatch({ type: "SEARCH", payload: query });
	// 	} else {
	// 		filterDispatch({ type: "RESET", payload: initialFilterState });
	// 	}
	// }, [query]);

	const passQuery = (e) => {
		e.preventDefault();
		if (query) {
			navigate(`/explore/search?query=${query}`);
			setQuery("");
		} else {
			navigate("/explore");
			setQuery("");
		}
	};

	return (
		<form
			onSubmit={passQuery}
			className={`${visibility} search_on_mobile`}
			method="get"
		>
			<input
				type="search"
				className="input_box"
				placeholder="Search for items"
				value={query}
				onChange={onChangeSearchHandler}
				required
			/>

			<button
				type="submit"
				onClick={passQuery}
				className="btn btn--primary btn--icon"
			>
				{bxIcons.searchAlt2}
			</button>
		</form>
	);
};
