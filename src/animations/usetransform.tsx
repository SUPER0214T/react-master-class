import {
	motion,
	useMotionValue,
	useTransform,
	Variants,
	useViewportScroll,
} from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

/* const Wrapper = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 200vh;
	background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: white;
	border-radius: 40px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
	const x = useMotionValue(0);
	const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
	const gradient = useTransform(
		x,
		[-800, 0, 800],
		[
			'linear-gradient(135deg, rgb(137, 240, 40), rgb(70, 81, 238))',
			'linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))',
			'linear-gradient(135deg, rgb(235, 212, 10), rgb(240, 101, 21))',
		]
	);
	const { scrollYProgress } = useViewportScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

	return (
		<Wrapper style={{ background: gradient }}>
			<Box style={{ x, rotateZ, scale }} drag dragSnapToOrigin />
		</Wrapper>
	);
}

export default App;
 */
