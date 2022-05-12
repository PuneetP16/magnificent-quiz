import { useEffect } from "react";

export const useDocumentTitle = (title) => {
	return useEffect(() => {
		document.title = title;
	}, [title]);
};
