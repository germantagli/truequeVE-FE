import React from 'react'
import { Button as MuiButton, ButtonProps } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'text'
	size?: 'small' | 'medium' | 'large'
}

const Button: React.FC<CustomButtonProps> = ({ 
	children, 
	variant = 'primary',
	size = 'medium',
	...props 
}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case 'primary':
				return {
					bgcolor: '#00E676',
					color: 'white',
					'&:hover': { bgcolor: '#00C853' },
					'&:disabled': { bgcolor: 'grey.300' }
				}
			case 'secondary':
				return {
					bgcolor: 'primary.main',
					color: 'white',
					'&:hover': { bgcolor: 'primary.dark' }
				}
			case 'outline':
				return {
					borderColor: 'primary.main',
					color: 'primary.main',
					'&:hover': { 
						bgcolor: 'primary.main',
						color: 'white'
					}
				}
			case 'text':
				return {
					color: 'primary.main',
					'&:hover': { bgcolor: 'primary.50' }
				}
			default:
				return {}
		}
	}

	const getSizeStyles = () => {
		switch (size) {
			case 'small':
				return { px: 2, py: 0.75, fontSize: '0.875rem' }
			case 'large':
				return { px: 4, py: 1.5, fontSize: '1.125rem' }
			default:
				return { px: 3, py: 1, fontSize: '1rem' }
		}
	}

	return (
		<MuiButton
			variant={variant === 'outline' ? 'outlined' : variant === 'text' ? 'text' : 'contained'}
			sx={{
				borderRadius: 2,
				fontWeight: 600,
				textTransform: 'none',
				...getVariantStyles(),
				...getSizeStyles(),
			}}
			{...props}
		>
			{children}
		</MuiButton>
	)
}

export default Button
