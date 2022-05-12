import "./Loader.css";
import { primaryLoader } from "data/image/productImages";


export const Loader = () => {
	return (
		<div className="modal_container" style={{ display: "flex" }}>
			<div className="loader_wrapper flex-center">
				<img
					src={primaryLoader}
					alt="loader"
					className="image--responsive image--round"
				/>
			</div>
		</div>
	);
};
