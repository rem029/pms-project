import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Dashboard,
	ProtectedRoute,
	Login,
	Master,
	Project,
	DetailProgressReport,
	ReportTemplate,
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

						<Route path={"report/"} element={<NotFound />} />
						<Route path={"report/detail-progress"} element={<DetailProgressReport />} />
						<Route
							path={"report/reportingB"}
							element={<ReportTemplate title="Statistics" />}
						/>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</StoreProvider>
		</BrowserRouter>
	);
};
