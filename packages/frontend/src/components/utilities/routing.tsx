import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, ProtectedRoute, Reporting, Login, Master, Project } from "components";
import { Main } from "pages/main";
import { NotFound } from "pages/notFound";

export const Routing = (): JSX.Element => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Main />
						</ProtectedRoute>
					}
				>
					<Route path="/" element={<Dashboard />} />
					<Route path={"dashboard"} element={<Dashboard />} />
					<Route path={"master"} element={<Master />} />
					<Route path={"projects"} element={<Project />} />
					<Route path={"reportingA"} element={<Reporting title="Progress" />} />
					<Route path={"reportingB"} element={<Reporting title="Statistics" />} />
					<Route
						path={"reportingC"}
						element={<Reporting title="Testing and Commissioning" />}
					/>
					<Route path={"reportingD"} element={<Reporting title="Inspection" />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
