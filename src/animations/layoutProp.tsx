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
	width: 400px;
	height: 400px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
	margin: 100px;
`;

const Circle = styled(motion.div)`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: rgb(135, 206, 235);
`;

function App() {
	const [clicked, setClicked] = useState(false);
	const toggleClicked = () => setClicked((prev) => !prev);

	return (
		<Wrapper onClick={toggleClicked}>
			<Box>
				{!clicked ? <Circle layoutId="circle" style={{ scaleX: '1' }} /> : null}
			</Box>
			<Box>
				{clicked ? <Circle layoutId="circle" style={{ scale: '3' }} /> : null}
			</Box>
		</Wrapper>
	);
}

export default App; */
