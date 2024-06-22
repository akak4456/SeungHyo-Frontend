import React, { useRef, useEffect, useState } from 'react';


const RECT_SIZE = 15;

const RECT_BORDER_SIZE = 1;

const GRASS_TEXT_COLOR = '#DFDFDF';

const GRASS_YEAR_TEXT_FONT = '47px Arial'; // CANVAS HEIGHT(=7 * RECT_SIZE) 와 텍스트의 너비가 동일하게 font size 조정해야 함
const paddingHorizontal = 16;
const GRASS_DAYS_TEXT_FONT = '10px Arial'; // RECT_SIZE - 8 와 TEXT 높이가 동일하도록 조절한다.
const GRASS_MONTH_DIVIDER_BORDER_UNSELECTED_COLOR = '#CDCDCD';
const GRASS_MONTH_DIVIDER_BORDER_SELECTED_COLOR = '#000000';
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
        ctx.fillText(dayText,daysTextEnd, RECT_SIZE * (index + 2) );
    });
    ctx.restore();
    return daysTextEnd;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function drawGrass(ctx, daysTextEnd, colorData) {
    const maxLevel = Math.max(...colorData.map(subarray => Math.max(...subarray.map(item => item.colorLevel))));
    const grassStartX = daysTextEnd + RECT_SIZE / 2;
    const grassStartY = RECT_SIZE + RECT_SIZE / 2;
    const monthDivideData = [];
    for(let i=0;i<12;i++) {
        monthDivideData[i] = {
            topWidth: 0,
            bottomWidth: 0,
            midY: 0,
            isSelected: false
        };
        /*
        topWidth: (i+1)월이 그래프 맨 위쪽에 있는 네모들 중 몇 개를 차지하는지
        bottomWidth: (i+1)월이 그래프 맨 아래쪽에 있는 네모들 중 몇개를 차지하는지
        midY: (i+1)월의 topWidth가 bottomWidth보다 클때 
        (i+1)월이 차지하는 영역중 중간에 다른 월도 껴있을 것인데 그것의 y 포인트가 어떻게 되는지
        */
    }
    colorData.forEach((colorDatum, columnIndex) => {
        if(colorDatum[0].colorLevel >= 0) {
            monthDivideData[colorDatum[0].date.getMonth()].topWidth++;
        }
        // console.log(colorDatum[colorDatum.length - 1].date);
        if(colorDatum[colorDatum.length - 1].colorLevel >= 0) {
            monthDivideData[colorDatum[colorDatum.length - 1].date.getMonth()].bottomWidth++;
        }
        for(let rowIndex = 0; rowIndex < colorDatum.length; rowIndex++) {
            if(rowIndex + 1 < colorDatum.length && colorDatum[rowIndex].date.getMonth() != colorDatum[rowIndex + 1].date.getMonth()) {
                monthDivideData[colorDatum[rowIndex].date.getMonth()].midY = rowIndex + 1;
            }
            const datum = colorDatum[rowIndex];
            if(datum.colorLevel >= 0) {
                monthDivideData[datum.date.getMonth()].isSelected = true;
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
                let fillColor = "#F8F8F8";
                if(datum.colorLevel > 0) {
                    fillColor = rgbToHex(
                        Math.floor(162 - ((datum.colorLevel - 1) / (maxLevel - 1)) * 162),
                        Math.floor(238 - ((datum.colorLevel - 1) / (maxLevel - 1)) * 86),
                        Math.floor(151 - ((datum.colorLevel - 1) / (maxLevel - 1)) * 35),
                    ); 
                }
                ctx.fillStyle = fillColor;
                ctx.fillRect(
                    grassStartX + (columnIndex) * (RECT_SIZE - RECT_BORDER_SIZE), 
                    grassStartY + (rowIndex) * (RECT_SIZE - RECT_BORDER_SIZE),
                    RECT_SIZE,
                    RECT_SIZE
                );
                ctx.lineWidth = RECT_BORDER_SIZE;
                ctx.strokeStyle = "#FFFFFF";
                ctx.strokeRect(
                    grassStartX + (columnIndex) * (RECT_SIZE - RECT_BORDER_SIZE), 
                    grassStartY + (rowIndex) * (RECT_SIZE - RECT_BORDER_SIZE),
                    RECT_SIZE,
                    RECT_SIZE
                )
            }
        }
    });
    // month divider 그리기
    let divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_UNSELECTED_COLOR;
    if(monthDivideData[0].isSelected) {
        divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_SELECTED_COLOR;
    }
    let startBoxIdx = 0;
    for(startBoxIdx = 0; startBoxIdx < colorData[0].length; startBoxIdx++) {
        if(colorData[0][startBoxIdx].colorLevel >= 0){
            break;
        }
    }
    let topStartX = grassStartX;
    if(startBoxIdx > 0) {
        topStartX += (RECT_SIZE - RECT_BORDER_SIZE);
    }
    let bottomStartX = grassStartX;
    ctx.beginPath();
    ctx.moveTo(topStartX, grassStartY);
    ctx.lineTo(topStartX, grassStartY + startBoxIdx * (RECT_SIZE - RECT_BORDER_SIZE));
    ctx.strokeStyle = divideBorderColor;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(topStartX, grassStartY + startBoxIdx * (RECT_SIZE - RECT_BORDER_SIZE));
    ctx.lineTo(bottomStartX, grassStartY + startBoxIdx * (RECT_SIZE - RECT_BORDER_SIZE));
    ctx.strokeStyle = divideBorderColor;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bottomStartX, grassStartY + startBoxIdx * (RECT_SIZE - RECT_BORDER_SIZE));
    ctx.lineTo(bottomStartX, grassStartY + 7 * (RECT_SIZE - RECT_BORDER_SIZE));
    ctx.strokeStyle = divideBorderColor;
    ctx.stroke();
    monthDivideData.forEach((divideData, columnIndex) => {
        divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_UNSELECTED_COLOR;
        if(divideData.isSelected) {
            divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_SELECTED_COLOR;
        }
        ctx.beginPath();
        ctx.moveTo(topStartX, grassStartY);
        ctx.lineTo(topStartX + (divideData.topWidth) * (RECT_SIZE - RECT_BORDER_SIZE), grassStartY);
        ctx.strokeStyle = divideBorderColor;
        topStartX += (divideData.topWidth) * (RECT_SIZE - RECT_BORDER_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bottomStartX, grassStartY + 7 * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.lineTo(bottomStartX + (divideData.bottomWidth) * (RECT_SIZE - RECT_BORDER_SIZE), grassStartY + 7 * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.strokeStyle = divideBorderColor;
        bottomStartX += (divideData.bottomWidth) * (RECT_SIZE - RECT_BORDER_SIZE);
        ctx.stroke();

        divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_UNSELECTED_COLOR;
        if(divideData.isSelected || (
            columnIndex + 1 < monthDivideData.length && monthDivideData[columnIndex + 1].isSelected
        )) {
            divideBorderColor = GRASS_MONTH_DIVIDER_BORDER_SELECTED_COLOR;
        }

        ctx.beginPath();
        ctx.moveTo(topStartX, grassStartY);
        ctx.lineTo(topStartX, grassStartY + divideData.midY * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.strokeStyle = divideBorderColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(topStartX, grassStartY + divideData.midY * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.lineTo(bottomStartX, grassStartY + divideData.midY * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.strokeStyle = divideBorderColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bottomStartX, grassStartY + divideData.midY * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.lineTo(bottomStartX, grassStartY + 7 * (RECT_SIZE - RECT_BORDER_SIZE));
        ctx.strokeStyle = divideBorderColor;
        ctx.stroke();
    })
}
const GrassGraph = props => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const handleResize = () => {
            const width = 80 * RECT_SIZE;
            setDimensions({ width, height: RECT_SIZE * 8 + RECT_BORDER_SIZE });
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
            const daysTextEnd = drawDayesText(ctx, yearTextEnd);
            drawGrass(ctx, daysTextEnd, props.data);
        }   
    }, [dimensions, props]);

    return (
        <canvas ref={canvasRef} style={{ width: dimensions.width, height: dimensions.height }} />
    );
};

export default GrassGraph;