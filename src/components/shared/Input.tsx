import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

interface InputProps extends Omit<TextFieldProps, 'variant'> {
	label: string
	error?: boolean
	helperText?: string
}

const Input: React.FC<InputProps> = ({ 
	label, 
	error = false, 
	helperText, 
	fullWidth = true,
	...props 
}) => {
	return (
		<TextField
			variant="outlined"
			label={label}
			error={error}
			helperText={helperText}
			fullWidth={fullWidth}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 2,
				},
				'& .MuiInputLabel-root': {
					fontWeight: 500,
				},
			}}
			{...props}
		/>
	)
}

export default Input
