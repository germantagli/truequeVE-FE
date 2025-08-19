import React from 'react'
import {
	Paper,
	List,
	ListItemButton,
	ListItemText,
	Typography,
	Box,
} from '@mui/material'

interface Section {
	id: string
	label: string
	icon: string
}

interface SidebarNavProps {
	sections: Section[]
	selectedSection: string
	onSectionChange: (section: string) => void
}

const SidebarNav: React.FC<SidebarNavProps> = ({
	sections,
	selectedSection,
	onSectionChange,
}) => {
	return (
		<Paper sx={{ p: 2 }}>
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
				Secciones
			</Typography>
			<List sx={{ p: 0 }}>
				{sections.map((section) => (
					<ListItemButton
						key={section.id}
						selected={selectedSection === section.id}
						onClick={() => onSectionChange(section.id)}
						sx={{
							borderRadius: 1,
							mb: 1,
							'&.Mui-selected': {
								bgcolor: 'primary.main',
								color: 'primary.contrastText',
								'&:hover': {
									bgcolor: 'primary.dark',
								},
							},
						}}
					>
						<ListItemText
							primary={
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<span>{section.icon}</span>
									{section.label}
								</Box>
							}
						/>
					</ListItemButton>
				))}
			</List>
		</Paper>
	)
}

export default SidebarNav
