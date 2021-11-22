import {
	motion,
	useMotionValue,
	useTransform,
	Variants,
	useViewportScroll,
	AnimatePresence,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-around;
	text-align: center;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
	position: relative;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 10px;
	width: 50vw;

	div:nth-child(1) {
		grid-column: 1 / 3;
	}

	div:nth-child(4) {
		grid-column: 2 / 4;
	}
`;

const Box = styled(motion.div)`
	height: 200px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
	cursor: pointer;
`;

const ModalWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;

	width: 100%;
	height: 100%;

	.box {
		position: relative;
		width: 500px;
		height: 300px;
		z-index: 1;
		cursor: auto;
	}

	.modalClose {
		transition: background-color 0.3s ease-in-out;

		&:hover {
			background-color: red;
		}
	}
`;

const Overlay = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const overlayVariants: Variants = {
	initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
	animate: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

const CloseButton = styled(motion.button)`
	position: absolute;
	top: 5px;
	right: 5px;
	width: 30px;
	height: 30px;
	background-color: pink;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 50%;
`;

function App() {
	const [id, setId] = useState<null | string>(null);

	return (
		<Wrapper>
			<Grid>
				{[1, 2, 3, 4].map((el, index) => {
					return (
						<Box
							onClick={() => setId(el + '')}
							key={index}
							layoutId={el + ''}
						/>
					);
				})}
			</Grid>
			<AnimatePresence>
				{id ? (
					<ModalWrapper>
						<Overlay
							onClick={(e) => {
								setId(null);
							}}
							className="overlay"
							variants={overlayVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						></Overlay>
						<Box className="box" layoutId={id}>
							<CloseButton
								onClick={(e) => {
									setId(null);
								}}
								className="modalClose"
								type="button"
							>
								x
							</CloseButton>
						</Box>
					</ModalWrapper>
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}

export default App;
