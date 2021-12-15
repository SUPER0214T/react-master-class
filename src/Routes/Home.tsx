import {
	AnimatePresence,
	motion,
	useViewportScroll,
	Variants,
} from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
	background: black;
	height: 200vh;
	overflow: hidden;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 4rem;
	margin-bottom: 16px;
`;

const Overview = styled.p`
	width: 50%;
	font-size: 16px;
`;

const Slider = styled.div`
	position: relative;
`;

const Row = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 5px;
	margin-bottom: 5px;
	position: absolute;
	top: -100px;
	width: 100%;
	color: white;
	font-size: 64px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: #fff;
	height: 200px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	cursor: pointer;

	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	opacity: 0;
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	position: absolute;
	width: 100%;
	bottom: 0;

	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const MovieModal = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 850px;
	height: 80vh;
	background-color: ${(props) => props.theme.black.lighter};
	z-index: 300;
	border-radius: 15px;
	overflow: hidden;
`;

const BigCover = styled.div<{ bgUrl: string }>`
	width: 100%;
	height: 480px;
	background-image: linear-gradient(to top, #181818, transparent 50%),
		url(${(props) => props.bgUrl});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	font-size: 36px;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	color: ${(props) => props.theme.white.lighter};
	position: relative;
	top: -70px;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	opacity: 0;
	z-index: 200;
`;

const rowVariants: Variants = {
	initial: {
		x: window.outerWidth + 5,
	},
	animate: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants: Variants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -50,
		transition: {
			delay: 0.35,
			type: 'tween',
			duration: 0.2,
		},
	},
};

const infoVariants: Variants = {
	normal: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: {
			delay: 0.35,
			type: 'tween',
			duration: 0.2,
		},
	},
};

const offset = 6; // Slider 한 페이지에 나오는 영화의 수

function Home() {
	const history = useHistory();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
	const { data, isLoading } = useQuery<IGetMovieResult>(
		['movie', 'nowPlaying'],
		getMovies
	);
	const { scrollY } = useViewportScroll();

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setLeaving(true);
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const toggleLeaving = () => {
		setLeaving(false);
	};

	const onBoxClicked = (movieId: number) => {
		history.push(`/movies/${movieId}`);
	};

	const onOverlayClick = () => {
		history.push(`/`);
	};

	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find((movie) => movie.id === +bigMovieMatch?.params.movieId);
	console.log(clickedMovie);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								key={index}
								variants={rowVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ type: 'tween', duration: 1 }}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box
											layoutId={movie.id + ''}
											onClick={() => onBoxClicked(movie.id)}
											variants={boxVariants}
											initial="normal"
											whileHover="hover"
											exit="exit"
											transition={{ type: 'tween' }}
											key={movie.id}
											bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<MovieModal
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.params.movieId}
								>
									{clickedMovie ? (
										<>
											<BigCover
												bgUrl={makeImagePath(
													clickedMovie.backdrop_path,
													'w500'
												)}
											/>
											<BigTitle>{clickedMovie.title}</BigTitle>
											<BigOverview>{clickedMovie.overview}</BigOverview>
										</>
									) : null}
								</MovieModal>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
