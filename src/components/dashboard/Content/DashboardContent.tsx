import styles from './dashboard-content.module.scss';

const DashboardContent = () => {
	return (
		<section className={styles.content}>
			<p>В процессе разработки 👨🏻‍💻</p>
			<img
				src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/810bf5c2-ce25-4a46-a0b2-1a14d096042f/dir0jnr-7a127556-f99e-4b62-adfe-ca269acb7c2f.png/v1/fill/w_1280,h_1280/chill_guy_png_transparent_by_unsermanemamamamaam_dir0jnr-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzgxMGJmNWMyLWNlMjUtNGE0Ni1hMGIyLTFhMTRkMDk2MDQyZlwvZGlyMGpuci03YTEyNzU1Ni1mOTllLTRiNjItYWRmZS1jYTI2OWFjYjdjMmYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rANi_sonEctYurDlsszi6n2t0pdsJKMr8pgGMTwayMs'
				alt='chill guy'
				width={300}
			/>
		</section>
	);
};

export default DashboardContent;
