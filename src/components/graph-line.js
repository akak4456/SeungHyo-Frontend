import React, { useRef, useEffect, useState } from 'react';

const COLUMN_WIDTH = 50;

const STROKE_LINE_COLOR = '#8884D8';

const POINT_TEXT_FONT = '12px Arial';

const POINT_TEXT_COLOR = '#8884D8';

const X_AXIS_FONT = '12px Arial';

const X_AXIS_COLOR = '#333333';
// 위의 const 들은 커스텀 할 수 있다.

const LineGraph = ({ data }) => {
	console.log(data);
	const canvasRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			const width = data.length * COLUMN_WIDTH;
			setDimensions({ width, height: 300 });
		};

		handleResize(); // Initial call to set dimensions
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			const { width, height } = dimensions;
			const padding = COLUMN_WIDTH / 2;

			canvas.width = width;
			canvas.height = height;

			ctx.clearRect(0, 0, width, height);

			// Draw X axis
			ctx.beginPath();
			ctx.moveTo(0, height - padding);
			ctx.lineTo(width, height - padding);
			ctx.stroke();

			// Draw the lines
			const xStep = COLUMN_WIDTH;
			const yMax = 1;
			const yMin = 0;
			const yScale = (height - padding * 2) / (yMax - yMin);

			ctx.beginPath();
			ctx.moveTo(padding, height - padding - (data[0].value - yMin) * yScale);

			data.forEach((point, index) => {
				const x = padding + index * xStep;
				const y = height - padding - (point.value - yMin) * yScale;
				ctx.lineTo(x, y);
			});

			ctx.strokeStyle = STROKE_LINE_COLOR;
			ctx.stroke();

			// Draw the points, their values, and dotted lines to x-axis
			data.forEach((point, index) => {
				const x = padding + index * xStep;
				const y = height - padding - (point.value - yMin) * yScale;

				// Draw point
				ctx.beginPath();
				ctx.arc(x, y, 4, 0, 2 * Math.PI);
				ctx.fillStyle = '#8884d8';
				ctx.fill();
				ctx.strokeStyle = '#8884d8';
				ctx.stroke();

				// Draw value above the point
				ctx.fillStyle = POINT_TEXT_COLOR;
				ctx.textAlign = 'center';
				ctx.font = POINT_TEXT_FONT;
				ctx.fillText((point.value * 100).toFixed(1) + '%', x, y - 10);

				// Draw dotted line to x-axis
				ctx.beginPath();
				ctx.setLineDash([5, 5]);
				ctx.moveTo(x, y);
				ctx.lineTo(x, height - padding);
				ctx.strokeStyle = POINT_TEXT_COLOR;
				ctx.stroke();
				ctx.setLineDash([]); // Reset to solid line
			});

			// Draw X axis labels
			data.forEach((point, index) => {
				const x = padding + index * xStep;
				ctx.fillStyle = X_AXIS_COLOR;
				ctx.font = X_AXIS_FONT;
				ctx.fillText(point.xLabel, x, height - padding + 20);
			});
		}
	}, [dimensions, data]);

	return (
		<canvas
			ref={canvasRef}
			style={{ width: dimensions.width, height: dimensions.height }}
		/>
	);
};

export default LineGraph;
