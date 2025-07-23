import { memo } from 'react';

import BooksChart from './BooksChart/BooksChart';

// import GenresChart from './GenresChart/GenresChart';

const DashboardLeftComponent = () => {
	return <BooksChart />;
	// return <GenresChart />;
};

const DashboardLeft = memo(DashboardLeftComponent);

export default DashboardLeft;
