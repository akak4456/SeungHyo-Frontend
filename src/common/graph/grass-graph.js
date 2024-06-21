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
    /*
    색 배정은 어떻게 해야 할까?
    1~14 단계가 있다고 하자
    1: rgb = 162,238,151
    3: rgb = 137, 225, 145
    5: rgb = 112, 211, 140
    14: rgb = 0, 152, 116
    1~3 rgb 차이 25, 13, 6
    3~5 rgb 차이 25, 14, 5
    1~5 rgb 차이 50, 27, 11
    1~14 rgb 차이 162, 86, 35
    즉
    최소 단계가 1, 최대 단계가 14 라 하고
    최소 단계의 rgb를 162,238,151 이라고 하면
    i단계 컬러를
    r: 162 - ((i - 1) / (14 - 1)) * 162
    g: 238 - ((i - 1) / (14 - 1)) * 86
    b: 151 - ((i - 1) / (14 - 1)) * 35
    이렇게 하면 14단계 컬러는 (0, 152, 116)
    3단계 컬러는(소수점 버림) (137, 225, 145)
    5단계 컬러는(소수점 버림) (112, 211, 140)
    그러니까 정리하면
    i 단계 컬러를
    r: 162 - ((i - 1) / (최대 단계 - 1)) * 162
    g: 238 - ((i - 1) / (최대 단계 - 1)) * 86
    b: 151 - ((i - 1) / (최대 단계 - 1)) * 35
    와 같이 지정하면 될 것 같다.
    */
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