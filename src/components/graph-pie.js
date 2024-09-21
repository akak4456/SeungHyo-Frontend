import React, { useEffect, useRef } from 'react';

const PieGraph = ({ rightCount, wrongCount }) => {
	const canvasRef = useRef(null);
	const totalCount = rightCount + wrongCount;
	const data = [
		(rightCount / totalCount) * 100,
		(wrongCount / totalCount) * 100,
	]; // [correct, wrong] correct + wrong = 100
	const correctColor = '#009874';
	const wrongColor = '#DD4124';

	const drawChart = (ctx) => {
		const totalValue = 100;
		const colors = [correctColor, wrongColor];

		let startAngle = -0.5 * Math.PI; // 12시 방향에서 시작
		const radius = 100;

		data.forEach((value, index) => {
			const sliceAngle = (2 * Math.PI * value) / totalValue;
			const endAngle = startAngle + sliceAngle;

			// Draw slice
			ctx.beginPath();
			ctx.moveTo(100, 100); // Center of the pie
			ctx.arc(100, 100, radius, startAngle, endAngle);
			ctx.closePath();

			ctx.fillStyle = colors[index];
			ctx.fill();

			// Calculate middle angle for text positioning
			const middleAngle = startAngle + sliceAngle / 2;
			const textX = 100 + (radius / 2) * Math.cos(middleAngle);
			const textY = 100 + (radius / 2) * Math.sin(middleAngle);

			// Draw text
			ctx.fillStyle = '#ffffff'; // White color for text
			ctx.font = '20px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(value.toFixed(1) + '%', textX, textY);

			startAngle = endAngle;
		});
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		drawChart(ctx);
	}, []);

	return <canvas ref={canvasRef} width={200} height={200}></canvas>;
};

export default PieGraph;
