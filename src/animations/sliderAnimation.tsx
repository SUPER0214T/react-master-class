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

/* const Wrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
	position: relative;
`;

const Box = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	width: 350px;
	height: 150px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
	position: absolute;
	top: 100px;
`;

const boxVariant: Variants = {
	invisible: (isBack: Boolean) => ({
		x: isBack ? -500 : 500,
		scale: 0,
		opacity: 0,
	}),
	visible: { x: 0, scale: 1, opacity: 1, transition: { duration: 0.35 } },
	exit: (isBack: Boolean) => ({
		x: isBack ? 500 : -500,
		rotateX: 180,
		scale: 0,
		opacity: 0,
		transition: { duration: 0.35 },
	}),
};

function App() {
	const [back, setBack] = useState(false); // Change the slider direction.
	const [visible, setVisible] = useState(1);
	const nextVisible = () => {
		setBack(false);
		setVisible((prev) => (prev === 10 ? 1 : prev + 1));
	};
	const prevVisible = () => {
		setBack(true);
		setVisible((prev) => (prev === 1 ? 10 : prev - 1));
	};

	return (
		<Wrapper>
			<AnimatePresence custom={back}>
				<Box
					key={visible}
					variants={boxVariant}
					initial="invisible"
					animate="visible"
					exit="exit"
					custom={back}
				>
					{visible}
				</Box>
			</AnimatePresence>
			<button onClick={nextVisible}>Next</button>
			<button onClick={prevVisible}>Prev</button>
		</Wrapper>
	);
}

export default App; */
