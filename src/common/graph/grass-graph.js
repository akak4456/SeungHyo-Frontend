import React, { useRef, useEffect, useState } from 'react';


const RECT_SIZE = 15;

const GRASS_TEXT_COLOR = '#DFDFDF';

const GRASS_YEAR_TEXT_FONT = '47px Arial'; // CANVAS HEIGHT(=7 * RECT_SIZE) 와 텍스트의 너비가 동일하게 font size 조정해야 함
const paddingHorizontal = 16;
const GRASS_DAYS_TEXT_FONT = '10px Arial'; // RECT_SIZE - 8 와 TEXT 높이가 동일하도록 조절한다.
function drawYearTitle(ctx, yearText) {
    // 년도를 새겨넣는다
    ctx.save();
    ctx.fillStyle = GRASS_TEXT_COLOR;
    ctx.textAlign = 'center';
    ctx.font = GRASS_YEAR_TEXT_FONT;
    ctx.rotate((-90 * Math.PI) / 180 );
    let metrics = ctx.measureText(yearText);
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const actualWidth = metrics.width;
    // console.log(actualWidth); 
    ctx.fillText(yearText,-(actualWidth / 2) - RECT_SIZE,actualHeight + paddingHorizontal);
    ctx.restore();
    return actualHeight + paddingHorizontal;
}
function drawDayesText(ctx, yearTextEnd) {
    ctx.save();
    const daysTextEnd = yearTextEnd + 10;
    const daysText = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysText.forEach((dayText, index) => {
        ctx.fillStyle = GRASS_TEXT_COLOR;
        ctx.textAlign = 'center';
        ctx.font = GRASS_DAYS_TEXT_FONT;
        let metrics = ctx.measureText(dayText);
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const actualWidth = metrics.width;
        console.log(actualWidth);
        ctx.fillText(dayText,daysTextEnd, RECT_SIZE * (index + 2) );
    });
    ctx.restore();
    return daysTextEnd;
}
const GrassGraph = props => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    console.log(props.data);
    useEffect(() => {
        const handleResize = () => {
            const width = 50 * RECT_SIZE;
            setDimensions({ width, height: RECT_SIZE * 8 });
        };

        handleResize(); // Initial call to set dimensions
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const { width, height } = dimensions;

            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            const yearTextEnd = drawYearTitle(ctx, props.year);
            drawDayesText(ctx, yearTextEnd);
        }   
    }, [dimensions, props]);

    return (
        <canvas ref={canvasRef} style={{ width: dimensions.width, height: dimensions.height }} />
    );
};

export default GrassGraph;