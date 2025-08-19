import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Input, Select, Button, Card, Modal, Loading } from './index'

const Example: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const categories = [
		{ value: 'electronics', label: 'Electrónica' },
		{ value: 'home', label: 'Hogar' },
		{ value: 'fashion', label: 'Moda' },
	]

	return (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Input 
						label="Nombre del producto"
						placeholder="Ej: iPhone 12 Pro"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Select 
						label="Categoría"
						options={categories}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button 
						variant="primary"
						onClick={() => setModalOpen(true)}
					>
						Abrir Modal
					</Button>
				</Grid>
			</Grid>

			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				title="Ejemplo de Modal"
				actions={
					<>
						<Button variant="outline" onClick={() => setModalOpen(false)}>
							Cancelar
						</Button>
						<Button variant="primary" onClick={() => setModalOpen(false)}>
							Confirmar
						</Button>
					</>
				}
			>
				<p>Este es un ejemplo de contenido del modal.</p>
			</Modal>

			{loading && <Loading message="Procesando..." fullScreen />}
		</Box>
	)
}

export default Example
