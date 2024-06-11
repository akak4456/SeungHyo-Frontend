import React from 'react';
import ReactDOM from 'react-dom';
import './intro.css';
import AdSample from '../../img/adsample.png'

class StatisticsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.endValue = props.mainNumber;
        this.duration = 1000; // 애니메이션 시간 (밀리초)
        this.incrementTime = 10; // 숫자 증가 주기 (밀리초)
        this.incrementValue = this.endValue / (this.duration / this.incrementTime);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.count + this.incrementValue >= this.endValue) {
                    clearInterval(this.interval);
                    return { count: this.endValue };
                }
                return { count: prevState.count + this.incrementValue };
            });
        }, this.incrementTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div className="intro-statistics-block">
                <p className="intro-statistics-block-main-text">{Math.floor(this.state.count)}</p>
                <p className='intro-statistics-block-sub-text'>{this.props.subTitle}</p>
            </div>
        )
    }
}

class Statistics extends React.Component {
    render() {
        return (
            <div className="intro-statistics">
                <StatisticsBlock mainNumber={30000} subTitle={"전체 문제"}/>
                <StatisticsBlock mainNumber={20000} subTitle={"채점 가능한 문제"}/>
                <StatisticsBlock mainNumber={1000} subTitle={"풀린 문제"}/>
                <StatisticsBlock mainNumber={2000} subTitle={"채점 가능 언어"}/>
            </div>
        )
    }
}

class Ad extends React.Component {
    render() {
        return (
            <img className="intro-ad" src={AdSample}></img>
        )
    }
}

export default class Intro extends React.Component {
    render() {
        return (
            <main>
                <Ad />
                <p className="intro-title">쉽다! 재미있다! 빠르다!</p>
                <Statistics />
            </main>
        )
    }
}