import { useAlert, useLoader } from "contexts";

export const useAxios = () => {
	// const { token } = useAuth();
	const { toggleLoader } = useLoader();
	const { setAlert } = useAlert();
	// let headers = {};
	let output, response, error;

	const axiosRequest = async ({ method, url, resKey, data = {}, alert }) => {
		// headers = {
		// 	authorization: token,
		// };
		try {
			if (!alert) {
				toggleLoader();
			}
			const res = "await axios({ url, method, data, headers });";
			if (res.status === 200 || res.status === 201) {
				console.log({ response });
				response = res.data;
				output = res.data[resKey];
				if (!alert) {
					toggleLoader();
				}
				if (alert) {
					console.log({ alert });
					setAlert((a) => ({
						...a,
						visibility: true,
						text: alert,
						type: "alert--success",
					}));
				}
			}
		} catch (err) {
			error = err.response.data.errors[0];
			console.log(error);
			if (!alert) {
				toggleLoader();
			}
		}
		return { output, response, error };
	};

	return { axiosRequest };
};
