import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import {
	Container,
	Box,
	Button,
	TextField,
	Grid,
	Typography,
	CircularProgress,
} from "@mui/material";

import { useAxios } from "../hooks/useAxios";
import { Token } from "@wakra-project/common";
import { saveToken } from "utils/storage";
import { URL_LOGIN } from "utils/constants";
import logo from "assets/logo-qpm-large.jpeg";

// ADD SHOW PASSWORD TO TEXT
export const Login = (): JSX.Element => {
	const [fields, setFields] = useState({ username: "", password: "" });
	const [helpText, setHelperText] = useState("");
	const { data, fetch, loading, success, message } = useAxios<Token>(URL_LOGIN, {
		method: "POST",
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && success && data) {
			saveToken(data.token);
			navigate("/");
		}
	}, [data, loading, success, navigate]);

	const handlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFields((currentFields) => ({
			...currentFields,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLDivElement>
	): void => {
		event.preventDefault();

		setHelperText("");

		if (!fields.username || !fields.password) {
			setHelperText("All fields with (*) are required.");
			return;
		}

		fetch({
			headers: {
				Authorization: `Basic ${Buffer.from(
					fields.username + ":" + fields.password
				).toString("base64")}`,
			},
		});
	};

	return (
		<Container maxWidth="xs">
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					bgcolor: "#fff",
					minHeight: "90vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					spacing={2}
					direction="column"
				>
					<Grid item xs={12}>
						<Box
							component="img"
							src={logo}
							sx={{ width: "100%", height: "auto", m: "auto" }}
							alignSelf="center"
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h5" align="center" color="primary">
							Project Management System
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h6" align="center">
							Login Page
						</Typography>
					</Grid>

					<Grid item container alignItems="center" justifyContent="center" xs={12}>
						<TextField
							required
							fullWidth
							label="Username"
							name="username"
							type="text"
							value={fields.username}
							onChange={handlChange}
						/>
					</Grid>

					<Grid item container alignItems="center" justifyContent="center" xs={12}>
						<TextField
							required
							fullWidth
							label="Password"
							type="password"
							name="password"
							value={fields.password}
							onChange={handlChange}
						/>
					</Grid>

					<Grid item container alignItems="center" justifyContent="center" xs={12}>
						<Button
							size="large"
							variant="contained"
							fullWidth
							type="submit"
							disabled={loading}
						>
							{loading ? <CircularProgress size={36} /> : "Login"}
						</Button>
					</Grid>
					<Grid item container alignItems="center" justifyContent="center" xs={12}>
						<Typography
							variant="caption"
							color={success ? "blue" : "red"}
							align="center"
							fontSize={12}
						>
							{message}
						</Typography>
					</Grid>
					<Grid item container alignItems="center" justifyContent="center" xs={12}>
						<Typography variant="caption" color="red" align="center" fontSize={16}>
							{helpText}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};
