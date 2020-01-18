import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { userSetSigned, getHalls, getTickets } from "../redux/dispatchers";
import BookingHeader from "./BookingHeader";
import HallsList from "./HallsList";
import HallBook from "./HallBook";
import HallTickets from './HallTickets'
import Message from './Message'

function Booking(props) {
	const { userSetSigned, getHalls, getTickets } = props;

	useEffect(() => {
		userSetSigned();
	});

	useEffect(() => {
		getHalls()
		// .catch(error => console.log(error));
	});

	useEffect(() => {
		getTickets();
	});

	return (
		<div className="booking-wrapper">
			<BrowserRouter>
				<Message />
				<BookingHeader />
				<Switch>
					<Route
						exact={true}
						path="/"
						render={routerProps => (
							<HallsList routerProps={routerProps} />
						)}
					/>
					<Route
						exact={true}
						path="/halls/:hallId"
						render={routerProps => (
							<HallBook routerProps={routerProps} />
						)}
					/>
					<Route
						exact={true}
						path="/tickets/:hallId"
						render={routerProps => (
							<HallTickets routerProps={routerProps} />
						)}
					/>
				</Switch>
			</BrowserRouter>
		</div >
	);
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = {
	userSetSigned,
	getHalls,
	getTickets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
