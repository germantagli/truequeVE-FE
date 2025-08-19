import React from 'react'
import { 
	FormControl, 
	InputLabel, 
	Select as MuiSelect, 
	MenuItem, 
	SelectProps,
	FormHelperText 
} from '@mui/material'

interface SelectOption {
	value: string | number
	label: string
}

interface SelectProps extends Omit<SelectProps, 'variant'> {
	label: string
	options: SelectOption[]
	error?: boolean
	helperText?: string
}

const Select: React.FC<SelectProps> = ({ 
	label, 
	options, 
	error = false, 
	helperText,
	fullWidth = true,
	...props 
}) => {
	return (
		<FormControl fullWidth={fullWidth} error={error}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				label={label}
				variant="outlined"
				sx={{
					borderRadius: 2,
					'& .MuiInputLabel-root': {
						fontWeight: 500,
					},
				}}
				{...props}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	)
}

export default Select
