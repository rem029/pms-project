import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Dashboard,
	ProtectedRoute,
	Login,
	DetailProgressReport,
	SummaryProgressReport,
	ActivityMaster,
	DeliverablesMaster,
} from "components";
import { Main } from "pages/main";
import { NotFound } from "pages/notFound";
import { StoreProvider } from "store";
import { useEffect } from "react";
import { InspectionEntry, InspectionTable } from "components/projects/inspection";

export const Routing = (): JSX.Element => {
	useEffect(() => {
		console.log("Routing rendered");
	}, []);

	return (
		<BrowserRouter>
			<StoreProvider maxNotification={3}>
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

						<Route path={"projects/"} element={<NotFound />} />
						<Route path={"projects/inspections/"} element={<InspectionTable />} />
						<Route path={"projects/inspections/entry"} element={<InspectionEntry />} />

						<Route path={"report/"} element={<NotFound />} />
						<Route path={"report/detail-progress"} element={<DetailProgressReport />} />
						<Route path={"report/summary-progress"} element={<SummaryProgressReport />} />

						<Route path={"master/"} element={<NotFound />} />
						<Route path={"master/deliverables"} element={<DeliverablesMaster />} />
						<Route path={"master/activities"} element={<ActivityMaster />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</StoreProvider>
		</BrowserRouter>
	);
};
