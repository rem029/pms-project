import { PrintOutlined } from "@mui/icons-material";
import { Modal, Paper, Button } from "@mui/material";

export const ReportingPrintPreviewModal = (props: {
	open: boolean;
	handleModalClose: () => void;
	reportElementInString: string;
}): JSX.Element => {
	const { open, handleModalClose, reportElementInString } = props;
	return (
		<Modal
			open={open}
			onClose={handleModalClose}
			sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
		>
			<Paper sx={{ width: "95%", height: "95%", overflowY: "scroll" }}>
				<Button
					onClick={() => {
						const PDF: HTMLIFrameElement | null = document.getElementById(
							"reportPrintF"
						) as HTMLIFrameElement | null;

						PDF?.focus();
						PDF?.contentWindow?.print();
					}}
					endIcon={<PrintOutlined />}
				>
					Print
				</Button>
				<iframe
					id="reportPrintF"
					name="reportPrintF"
					srcDoc={reportElementInString}
					style={{ width: "100%", height: "100%" }}
				/>
			</Paper>
		</Modal>
	);
};
