import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
	background: black;
	height: 200vh;
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
	width: 100%;
	height: 100%;
`;

const Row = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	margin-bottom: 10px;
	position: absolute;
	top: -100px;
	width: 100%;
	color: red;
	font-size: 64px;
	z-index: 10;
`;

const Box = styled(motion.div)`
	background-color: #fff;
	height: 200px;
`;

const rowVariants: Variants = {
	initial: {
		x: window.outerWidth + 10,
	},
	animate: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
	},
};

function Home() {
	const { data, isLoading } = useQuery<IGetMovieResult>(
		['movie', 'nowPlaying'],
		getMovies
	);

	const [index, setIndex] = useState(0);
	const increaseIndex = () => setIndex((prev) => prev + 1);

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
						<AnimatePresence>
							<Row
								key={index}
								variants={rowVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ type: 'tween', duration: 1 }}
							>
								{[1, 2, 3, 4, 5, 6].map((el) => (
									<Box>{el}</Box>
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
