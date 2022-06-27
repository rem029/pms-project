import { Autocomplete, TextField, CircularProgress } from "@mui/material";

export type AutoCompleteInputOptions = {
	id: string;
	name: string;
};

export interface AutoCompleteInputProps {
	options: AutoCompleteInputOptions[];
	value?: AutoCompleteInputOptions;
	name?: string;
	label?: string;
	loading?: boolean;

	// eslint-disable-next-line no-unused-vars
	handleChange?: (name: string, value: AutoCompleteInputOptions | null) => void;
}

export const AutoCompleteInput = ({
	options,
	value,
	name,
	label,
	loading,
	handleChange,
}: AutoCompleteInputProps): JSX.Element => {
	return (
		<Autocomplete
			disablePortal
			options={options ? options : []}
			getOptionLabel={(option) => option.name}
			// value={value !== undefined ? value : null}
			value={value && value}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(_, value) => {
				handleChange && handleChange(name || _.currentTarget.nodeName, value);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					name={name || ""}
					label={label || ""}
					fullWidth
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};
