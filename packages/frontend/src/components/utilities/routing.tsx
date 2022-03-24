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
					<Route path={"reportingA"} element={<Reporting title="A" />} />
					<Route path={"reportingB"} element={<Reporting title="B" />} />
					<Route path={"reportingC"} element={<Reporting title="C" />} />
					<Route path={"reportingD"} element={<Reporting title="D" />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
