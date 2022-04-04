import { CloseOutlined, PrintOutlined } from "@mui/icons-material";
import { Modal, Paper, Button, Box, IconButton } from "@mui/material";

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
			<Paper sx={{ width: "95%", height: "98%", overflowY: "scroll" }}>
				<Box component="div" display="flex" justifyContent="space-between">
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

					<IconButton onClick={handleModalClose}>
						<CloseOutlined />
					</IconButton>
				</Box>
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
