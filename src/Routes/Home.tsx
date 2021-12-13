import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
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
	color: red;
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
		},
	},
};

const offset = 6; // Slider 한 페이지에 나오는 영화의 수

function Home() {
	const { data, isLoading } = useQuery<IGetMovieResult>(
		['movie', 'nowPlaying'],
		getMovies
	);

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
											variants={boxVariants}
											initial="normal"
											whileHover="hover"
											exit="exit"
											transition={{ type: 'tween' }}
											key={movie.id}
											bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
										/>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
