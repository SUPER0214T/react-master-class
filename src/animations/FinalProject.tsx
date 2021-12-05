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
	flex-wrap: nowrap;
	justify-content: space-around;
	text-align: center;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
	position: relative;
`;

const Box = styled(motion.div)`
	height: 200px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 50vw;
	gap: 10px;
	div:first-child,
	div:last-child {
		grid-column: span 2;
	}
`;

const Overlay = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const overlay = {
	hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' },
	visible: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
	exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

function App() {
	const [id, setId] = useState<null | string>(null);
	console.log(id);

	return (
		<Wrapper>
			<Grid>
				{['1', '2', '3', '4'].map((i) => (
					<Box key={i} layoutId={i} onClick={() => setId(i)} />
				))}
			</Grid>
			<AnimatePresence>
				{id ? (
					<Overlay
						variants={overlay}
						onClick={() => setId(null)}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<Box layoutId={id} style={{ width: 400, height: 200 }} />
					</Overlay>
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}

export default App; */
