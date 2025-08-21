import { LazyMotion, domAnimation } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { registerSW } from 'virtual:pwa-register';

import App from './App';
import './services/firebase/firebase';
import { store } from './store';

import './global.scss';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<Provider store={store}>
					<LazyMotion features={domAnimation}>
						<App />
					</LazyMotion>
				</Provider>
			</BrowserRouter>
		</HelmetProvider>
	</StrictMode>
);
