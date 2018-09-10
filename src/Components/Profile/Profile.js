import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getUserResults } from './../../ducks/reducer';
import Modal from 'react-responsive-modal';
// import Charts from './../Charts/Charts';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			tipOfDay: 'Keep your fingers relaxed.',
			wpmHist: {},
			accHist: {}
		};
	}

    componentWillReceiveProps(nextProps){
        this.setState({open: nextProps.show})
    }

	hideProfileModal = () => {
        this.props.close()
		this.setState({ open: false });
	};

	render() {
		let tests = this.props.userTestResults;
		let WPMArray = [];
		let ACCArray =[];
		if(tests.length){
			WPMArray.push(tests[0].wpm)
			ACCArray.push(tests[0].accuracy)
		}
		return (
			<Modal open={this.state.open} onClose={this.hideProfileModal} className={{ modal: 'custom-modal' }} center>
				<div className="profile-userInfo">
					<img src={this.props.user.img} className="profile-userInfo-img" alt="user icon" />
					<h2>Welcome {this.props.user.username}</h2>
				</div>

				<div className="profile-graphs">
					{/* <div><Charts WPMArray={WPMArray} ACCArray={ACCArray}/></div> */}
				</div>

				<div className="profile-tips">
					<h3>Tip Of The Day: {this.state.tipOfDay}</h3>
				</div>
			</Modal>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		userTestResults: state.results
	};
};

export default connect(mapStateToProps, { getUser, getUserResults})(Profile);