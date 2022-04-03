import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Dashboard,
	ProtectedRoute,
	Reporting,
	Login,
	Master,
	Project,
	ReportDetailProgress,
} from "components";
import { Main } from "pages/main";
import { NotFound } from "pages/notFound";
import { StoreProvider } from "store";

export const Routing = (): JSX.Element => {
	return (
		<BrowserRouter>
			<StoreProvider maxNotification={6}>
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
						<Route path={"report-detail-progress"} element={<ReportDetailProgress />} />
						<Route path={"reportingB"} element={<Reporting title="Statistics" />} />
						<Route
							path={"reportingC"}
							element={<Reporting title="Testing and Commissioning" />}
						/>
						<Route path={"reportingD"} element={<Reporting title="Inspection" />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</StoreProvider>
		</BrowserRouter>
	);
};
