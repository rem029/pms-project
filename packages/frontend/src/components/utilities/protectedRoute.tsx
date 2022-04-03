import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "utils/storage";

interface ProtectedRoutesProps {
	children?: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRoutesProps): JSX.Element => {
	const token = getToken();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) navigate("/login");
	}, [token, navigate]);

	return <>{children}</>;
};
