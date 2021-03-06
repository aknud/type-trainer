import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import {getUserResults} from './../../ducks/reducer';

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            WPMData: {},
            ACCData: {}
        }
        this.WPMData = {
            labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [{
                    label: 'WPM',
                    data:[],
                }]
        }
        this.ACCData = {
            labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [{
                    label: 'Accuracy',
                    data:[]
                }]
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateState()

        }
    }
    updateState = () => {
        this.setState({
            WPMData: {
                labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                datasets: [{
                        label: 'WPM',
                        data: this.props.WPMArray
                    }],
                title:'Title Here'
            },
            ACCData: {
                labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                datasets: [{
                        label: 'Accuracy',
                        data:
                            this.props.ACCArray
                    }],

            }
        })
    }

    render() {
        return (
            <div className="chartsWrapper">
                <div className="chart chartWPM">
                    <Line
                        data={this.WPMData}
                        width={1}
                        height={1}
                    />
                </div>
                <div className="chart chartACC">
                    <Line
                        data={this.ACCData}
                        width={100}
                        height={20}
                    />
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
	return {
		userResults: state.results
	};
};
export default connect(mapStateToProps, {getUserResults})(Charts);
