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
	text-align: center;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
	margin: 0 auto;
	width: 400px;
	height: 200px;
	background-color: white;
	border-radius: 40px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariant: Variants = {
	initial: { scale: 0, opacity: 0 },
	visible: { scale: 1, opacity: 1, rotateZ: 360 },
	leaving: { scale: 0, opacity: 0, y: 50 },
};

function App() {
	const [showing, setShowing] = useState(true);
	const toggleShowing = () => setShowing((prev) => !prev);

	return (
		<Wrapper>
			<button onClick={toggleShowing}>Toggle</button>
			<AnimatePresence>
				{showing ? (
					<Box
						variants={boxVariant}
						initial="initial"
						animate="visible"
						exit="leaving"
					/>
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}

export default App;
