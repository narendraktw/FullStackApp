import { BrowserRouter } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
	return (
		<ErrorBoundary fallback={<div>Loading...</div>}>
			<BrowserRouter>
				<Container maxWidth="lg">
					{/* Use Grid system or a separate Layout component here */}
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<AppRoutes />
						</Grid>
					</Grid>
				</Container>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
