import React, { useState, useRef, useEffect } from 'react'
import {
	Box,
	Grid,
	TextField,
	Button,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	IconButton,
	InputAdornment,
	Paper,
	CardMedia,
	useTheme,
	useMediaQuery,
	AppBar,
	Toolbar,
	Divider,
	Container,
} from '@mui/material'
import {
	Send as SendIcon,
	AttachFile as AttachFileIcon,
	Image as ImageIcon,
	Search as SearchIcon,
	ArrowBack as ArrowBackIcon,
	Chat as ChatIcon,
	Home as HomeIcon,
	Category as CategoryIcon,
	Add as AddIcon,
	Person as PersonIcon,
	Notifications as NotificationsIcon,
	Help as HelpIcon,
	Description as TermsIcon,
	Security as PrivacyIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'

interface Message {
	id: number
	text: string
	sender: 'me' | 'other'
	timestamp: Date
	image?: string
}

interface Conversation {
	id: number
	name: string
	avatar: string
	lastMessage: string
	lastMessageTime: string
	isActive: boolean
}

const conversations: Conversation[] = [
	{
		id: 1,
		name: 'María G.',
		avatar: 'https://via.placeholder.com/40x40/00E676/FFFFFF?text=MG',
		lastMessage: '¿Te interesa el iPhone?',
		lastMessageTime: '2 min',
		isActive: true,
	},
	{
		id: 2,
		name: 'Carlos R.',
		avatar: 'https://via.placeholder.com/40x40/FF6B35/FFFFFF?text=CR',
		lastMessage: 'Perfecto, nos vemos mañana',
		lastMessageTime: '1 hora',
		isActive: false,
	},
	{
		id: 3,
		name: 'Ana M.',
		avatar: 'https://via.placeholder.com/40x40/2E7CF6/FFFFFF?text=AM',
		lastMessage: '¿Aún tienes la guitarra?',
		lastMessageTime: '3 horas',
		isActive: true,
	},
	{
		id: 4,
		name: 'Luis P.',
		avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=LP',
		lastMessage: '¿Cuál es el precio final?',
		lastMessageTime: '5 horas',
		isActive: false,
	},
	{
		id: 5,
		name: 'Carmen L.',
		avatar: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=CL',
		lastMessage: 'Te envío las fotos mañana',
		lastMessageTime: '1 día',
		isActive: true,
	},
]

const messages: Message[] = [
	{
		id: 1,
		text: 'Hola, ¿te interesa el iPhone 12 Pro?',
		sender: 'other',
		timestamp: new Date(Date.now() - 1000 * 60 * 5),
	},
	{
		id: 2,
		text: 'Sí, me interesa mucho. ¿En qué estado está?',
		sender: 'me',
		timestamp: new Date(Date.now() - 1000 * 60 * 4),
	},
	{
		id: 3,
		text: 'Está en excelente estado, solo 1 año de uso',
		sender: 'other',
		timestamp: new Date(Date.now() - 1000 * 60 * 3),
	},
	{
		id: 4,
		text: '¿Podrías enviarme más fotos?',
		sender: 'me',
		timestamp: new Date(Date.now() - 1000 * 60 * 2),
	},
	{
		id: 5,
		text: 'Claro, aquí tienes',
		sender: 'other',
		timestamp: new Date(Date.now() - 1000 * 60 * 1),
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+Fotos',
	},
]

function Chat() {
	const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
	const [messageText, setMessageText] = useState('')
	const [chatMessages, setChatMessages] = useState<Message[]>(messages)
	const [showChatView, setShowChatView] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chatMessages])

	const handleSendMessage = () => {
		if (messageText.trim()) {
			const newMessage: Message = {
				id: chatMessages.length + 1,
				text: messageText,
				sender: 'me',
				timestamp: new Date(),
			}
			setChatMessages([...chatMessages, newMessage])
			setMessageText('')
		}
	}

	const handleConversationSelect = (conversation: Conversation) => {
		setSelectedConversation(conversation)
		if (isMobile) {
			setShowChatView(true)
		}
	}

	const handleBackToConversations = () => {
		setShowChatView(false)
	}

	const handlePublishClick = () => {
		navigate('/publish/step1')
	}

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />
			{/* Main Content */}
			<Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
				<Box 
					sx={{ 
						width: '100%', 
						maxWidth: 1200, 
						height: '85vh', 
						bgcolor: 'background.paper', 
						borderRadius: 2, 
						overflow: 'hidden',
						boxShadow: 3,
						display: 'flex'
					}}
				>
					{isMobile ? (
						// Vista móvil
						showChatView ? (
							// Chat view en móvil
							<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
								{/* Header del chat */}
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
										<IconButton onClick={handleBackToConversations}>
											<ArrowBackIcon />
										</IconButton>
										<Avatar src={selectedConversation.avatar} />
										<Box sx={{ flex: 1 }}>
											<Typography variant="h6" sx={{ fontWeight: 600 }}>
												{selectedConversation.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{selectedConversation.isActive ? 'Activa ahora' : 'Activa hace 2 horas'}
											</Typography>
										</Box>
									</Box>
								</Box>

								{/* Mensajes */}
								<Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#f8f9fa' }}>
									{chatMessages.map((message) => (
										<Box
											key={message.id}
											sx={{
												display: 'flex',
												justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
												mb: 2,
											}}
										>
											<Box sx={{ maxWidth: '70%' }}>
												<Paper
													sx={{
														p: 2,
														bgcolor: message.sender === 'me' ? '#00E676' : 'white',
														color: message.sender === 'me' ? 'white' : 'black',
														borderRadius: 2,
														boxShadow: 1,
													}}
												>
													{message.image && (
														<CardMedia
															component="img"
															image={message.image}
															alt="Imagen del mensaje"
															sx={{ width: 200, height: 150, borderRadius: 1, mb: 1 }}
														/>
													)}
													<Typography variant="body2">{message.text}</Typography>
												</Paper>
												<Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
													{formatTime(message.timestamp)}
												</Typography>
											</Box>
										</Box>
									))}
									<div ref={messagesEndRef} />
								</Box>

								{/* Input de mensaje */}
								<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
										<IconButton size="small">
											<AttachFileIcon />
										</IconButton>
										<IconButton size="small">
											<ImageIcon />
										</IconButton>
										<TextField
											fullWidth
											multiline
											maxRows={4}
											placeholder="Escribe un mensaje..."
											value={messageText}
											onChange={(e) => setMessageText(e.target.value)}
											onKeyPress={(e) => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault()
													handleSendMessage()
												}
											}}
											variant="outlined"
											size="small"
										/>
										<Button
											variant="contained"
											onClick={handleSendMessage}
											disabled={!messageText.trim()}
											sx={{ bgcolor: '#00E676', color: 'white', minWidth: 'auto' }}
										>
											<SendIcon />
										</Button>
									</Box>
								</Box>
							</Box>
						) : (
							// Lista de conversaciones en móvil
							<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
										Conversaciones
									</Typography>
									<TextField
										fullWidth
										placeholder="Buscar conversaciones..."
										variant="outlined"
										size="small"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											),
										}}
									/>
								</Box>
								<Box sx={{ flex: 1, overflow: 'auto' }}>
									<List sx={{ p: 0 }}>
										{conversations.map((conversation) => (
											<React.Fragment key={conversation.id}>
												<ListItem
													button
													onClick={() => handleConversationSelect(conversation)}
													sx={{ py: 2 }}
												>
													<ListItemAvatar>
														<Box sx={{ position: 'relative' }}>
															<Avatar src={conversation.avatar} />
															{conversation.isActive && (
																<Box
																	sx={{
																		position: 'absolute',
																		bottom: 0,
																		right: 0,
																		width: 12,
																		height: 12,
																		bgcolor: '#00E676',
																		borderRadius: '50%',
																		border: `2px solid ${theme.palette.background.paper}`,
																	}}
																/>
															)}
														</Box>
													</ListItemAvatar>
													<ListItemText
														primary={conversation.name}
														secondary={conversation.lastMessage}
														primaryTypographyProps={{ fontWeight: 600 }}
														secondaryTypographyProps={{ fontSize: '0.875rem' }}
													/>
													<Typography variant="caption" color="text.secondary">
														{conversation.lastMessageTime}
													</Typography>
												</ListItem>
												<Divider />
											</React.Fragment>
										))}
									</List>
								</Box>
							</Box>
						)
					) : (
						// Vista desktop
						<>
							{/* Lista de conversaciones */}
							<Box sx={{ width: 350, borderRight: `1px solid ${theme.palette.divider}`, display: 'flex', flexDirection: 'column' }}>
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
										Conversaciones
									</Typography>
									<TextField
										fullWidth
										placeholder="Buscar conversaciones..."
										variant="outlined"
										size="small"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											),
										}}
									/>
								</Box>
								<Box sx={{ flex: 1, overflow: 'auto' }}>
									<List sx={{ p: 0 }}>
										{conversations.map((conversation) => (
											<React.Fragment key={conversation.id}>
												<ListItem
													button
													selected={selectedConversation.id === conversation.id}
													onClick={() => handleConversationSelect(conversation)}
													sx={{ py: 2 }}
												>
													<ListItemAvatar>
														<Box sx={{ position: 'relative' }}>
															<Avatar src={conversation.avatar} />
															{conversation.isActive && (
																<Box
																	sx={{
																		position: 'absolute',
																		bottom: 0,
																		right: 0,
																		width: 12,
																		height: 12,
																		bgcolor: '#00E676',
																		borderRadius: '50%',
																		border: `2px solid ${theme.palette.background.paper}`,
																	}}
																/>
															)}
														</Box>
													</ListItemAvatar>
													<ListItemText
														primary={conversation.name}
														secondary={conversation.lastMessage}
														primaryTypographyProps={{ fontWeight: 600 }}
														secondaryTypographyProps={{ fontSize: '0.875rem' }}
													/>
													<Typography variant="caption" color="text.secondary">
														{conversation.lastMessageTime}
													</Typography>
												</ListItem>
												<Divider />
											</React.Fragment>
										))}
									</List>
								</Box>
							</Box>

							{/* Chat */}
							<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
								{/* Header del chat */}
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
										<Avatar src={selectedConversation.avatar} />
										<Box sx={{ flex: 1 }}>
											<Typography variant="h6" sx={{ fontWeight: 600 }}>
												{selectedConversation.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{selectedConversation.isActive ? 'Activa ahora' : 'Activa hace 2 horas'}
											</Typography>
										</Box>
									</Box>
								</Box>

								{/* Mensajes */}
								<Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#f8f9fa' }}>
									{chatMessages.map((message) => (
										<Box
											key={message.id}
											sx={{
												display: 'flex',
												justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
												mb: 2,
											}}
										>
											<Box sx={{ maxWidth: '70%' }}>
												<Paper
													sx={{
														p: 2,
														bgcolor: message.sender === 'me' ? '#00E676' : 'white',
														color: message.sender === 'me' ? 'white' : 'black',
														borderRadius: 2,
														boxShadow: 1,
													}}
												>
													{message.image && (
														<CardMedia
															component="img"
															image={message.image}
															alt="Imagen del mensaje"
															sx={{ width: 200, height: 150, borderRadius: 1, mb: 1 }}
														/>
													)}
													<Typography variant="body2">{message.text}</Typography>
												</Paper>
												<Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
													{formatTime(message.timestamp)}
												</Typography>
											</Box>
										</Box>
									))}
									<div ref={messagesEndRef} />
								</Box>

								{/* Input de mensaje */}
								<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
									<Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
										<IconButton size="small">
											<AttachFileIcon />
										</IconButton>
										<IconButton size="small">
											<ImageIcon />
										</IconButton>
										<TextField
											fullWidth
											multiline
											maxRows={4}
											placeholder="Escribe un mensaje..."
											value={messageText}
											onChange={(e) => setMessageText(e.target.value)}
											onKeyPress={(e) => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault()
													handleSendMessage()
												}
											}}
											variant="outlined"
											size="small"
										/>
										<Button
											variant="contained"
											onClick={handleSendMessage}
											disabled={!messageText.trim()}
											sx={{ bgcolor: '#00E676', color: 'white', minWidth: 'auto' }}
										>
											<SendIcon />
										</Button>
									</Box>
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
			<Footer />
		</Box>
	)
}

export default Chat
