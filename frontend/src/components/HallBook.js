import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HallCard from "./HallCard";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from "moment";
import TimePicker from './TimePicker'
import { setActiveTicket, addTicket, updTicket, messageSetSuccess, messageSetError } from "../redux/dispatchers";

function getDatesRange(from, to) {
	let start = moment(from);
	let end = moment(to);
	if (start.isSame(end, 'day')) return [start.toDate()]
	if (end.diff(start, 'days') === 1) return [start.toDate(), end.toDate()]
	let range = [];
	range.push(start.toDate());
	let days = end.diff(start, "days");
	for (let i = 1; i < days; i++) {
		range.push(start.clone().add(i, "d").toDate());
	}
	range.push(end.toDate());
	return range;
}

function getNumbersRange(start, end = start) {
	if (start === end) return [start]
	if (end - start < 2) return [start, end]
	let range = []
	for (let i = start; i <= end; i++) {
		range.push(i)
	}
	return range;
}

function hasAvailableTime(hours) {
	let availableHours =
		getNumbersRange(0, 23)
			.filter(hour => !hours.includes(hour));
	availableHours =
		availableHours.filter(hour => availableHours.includes(hour - 1) || availableHours.includes(hour + 1))
	return availableHours.length > 1
}

function getAvailableHours(disabledHours) {
	let availableHours =
		getNumbersRange(0, 23)
			.filter(hour => !disabledHours.includes(hour));
	availableHours =
		availableHours.filter(hour => availableHours.includes(hour - 1) || availableHours.includes(hour + 1))
	return availableHours
}

function HallBook(props) {

	const { user, hasTickets, hall, activeTicket, tickets, setActiveTicket, addTicket, updTicket, messageSetError, routerProps } = props;

	const [dates, setDates] = useState([]);
	const [title, setTitle] = useState("");
	const [withTime, setWithTime] = useState(false);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [editMode, setEditMode] = useState(false);
	const [fieldError, setFieldError] = useState('')
	const [availableHours, setAvailableHours] = useState({ start: [], end: [] })

	useEffect(() => {
		// console.log('use-effect')
		if (activeTicket && !editMode) {
			setTitle(activeTicket.title)
			setDates([moment(activeTicket.from).toDate(), moment(activeTicket.to).toDate()])
			if (moment(activeTicket.from).hours() || moment(activeTicket.to).hours()) {
				setWithTime(true)
				setStartTime(String(moment(activeTicket.from).hours()))
				setEndTime(String(moment(activeTicket.to).hours()))
				let timedDates = getTimedDates();
				if (timedDates[+moment(activeTicket.from).startOf('day')]) {
					setAvailableHours(prevState => {
						return {
							...prevState,
							start: getAvailableHours(timedDates[+moment(activeTicket.from).startOf('day')]),
						}
					})
				}
				if (timedDates[+moment(activeTicket.to).startOf('day')]) {
					setAvailableHours(prevState => {
						return {
							...prevState,
							end: getAvailableHours(timedDates[+moment(activeTicket.to).startOf('day')]),
						}
					})
				}
			}
			setEditMode(true)
		}
		if (hall && hall.title) setTitle(hall.title)

		return function cancelEdit() {
			if (editMode) {
				clearSelectedDates();
				setActiveTicket('');
				setEditMode(false);
			}
		}
	}, [activeTicket, editMode, setActiveTicket, hall])

	function getTimedDates() {
		if (!tickets.length) return [];
		let disabledTickets = activeTicket ? tickets.filter(ticket => ticket._id !== activeTicket._id) : tickets
		let timedTickets = disabledTickets.filter(ticket => moment(ticket.from).hours() || moment(ticket.to).hours())
		let timedDates = timedTickets.reduce((acc, ticket) => {
			let dateFrom = +moment(ticket.from).startOf('day')
			let dateTo = +moment(ticket.to).startOf('day')
			let hoursRangeFrom = dateFrom === dateTo ? getNumbersRange(moment(ticket.from).hours(), moment(ticket.to).hours()) : getNumbersRange(moment(ticket.from).hours(), 23)
			let hoursRangeTo = dateFrom === dateTo ? [] : getNumbersRange(0, moment(ticket.to).hours())
			acc[dateFrom] = acc[dateFrom] ? [...acc[dateFrom], ...hoursRangeFrom].sort((a, b) => a - b) : [...hoursRangeFrom]
			acc[dateTo] = acc[dateTo] ? [...acc[dateTo], ...hoursRangeTo] : [...hoursRangeTo]
			return acc
		}, {})

		return timedDates;
	}

	function setDisabledDates() {
		if (!tickets.length) return [];
		let disabledTickets = activeTicket ? tickets.filter(ticket => ticket._id !== activeTicket._id) : tickets
		let timedDates = getTimedDates();
		let disabledDates = disabledTickets.reduce((acc, ticket) => {
			let momentFrom = moment(ticket.from);
			let momentTo = moment(ticket.to);
			//if the same days
			if (momentFrom.isSame(momentTo, 'day')) {
				//if without time
				if (!momentFrom.hours() && !momentTo.hours()) {
					return [...acc, momentFrom.toDate()]
				}
				//if with time and has no available time
				if (timedDates[+momentFrom.startOf('day')] && !hasAvailableTime(timedDates[+momentFrom.startOf('day')])) {
					if (!acc.find(date => +date === +momentFrom.toDate())) {
						return [...acc, momentFrom.toDate()];
					}
				}
				return acc;
			}
			//if different days without time
			if (!momentFrom.hours() && !momentTo.hours()) {
				return [...acc, ...getDatesRange(ticket.from, ticket.to)];
			}
			//if different day with time and no days in between
			if (momentTo.startOf('day').diff(momentFrom.startOf('day'), 'days') === 1) {
				return acc;
			}
			//if different day with time and more then one day in between 
			let rangeStart = momentFrom.startOf('day').add(1, 'd');
			let rangeEnd = momentTo.startOf('day').subtract(1, 'd');
			if (timedDates[+momentFrom.startOf('day')] && !hasAvailableTime(timedDates[+momentFrom.startOf('day')])) {
				if (!acc.find(date => +date === +momentFrom.toDate())) {
					acc.push(momentFrom.toDate())
				}
			}
			if (timedDates[+momentTo.startOf('day')] && !hasAvailableTime(timedDates[+momentTo.startOf('day')])) {
				if (!acc.find(date => +date === +momentTo.toDate())) {
					acc.push(momentTo.toDate())
				}
			}
			return [...acc, ...getDatesRange(rangeStart, rangeEnd)];
		}, []);

		return disabledDates;
	}

	function selectDate(value) {
		const [from, to] = value;
		let fromStart = moment(from).startOf('day').toDate()
		if (+fromStart in timedDates) {
			setWithTime(true)
			setAvailableHours(prevState => {
				return {
					...prevState,
					start: getAvailableHours(timedDates[+fromStart])
				}
			})
		}
		let validSelected = true;
		if (to) {
			let disabled = setDisabledDates().map(item => +item);
			let selected = getDatesRange(fromStart, to);
			validSelected = selected.reduce((acc, next) => {
				return acc && !disabled.includes(+next);
			}, true);
		}
		if (!validSelected) {
			messageSetError(['Invalid range of dates!'])
			setDates([fromStart, null]);
			return;
		}
		if (to) {
			let toStart = moment(to).startOf('day').toDate()
			let availableTo = getNumbersRange(0, 23)
			if (+fromStart === +toStart && startTime) {
				availableTo = availableTo.filter(hour => hour > +startTime)
			}
			if (+toStart in timedDates) {
				if (!withTime) setWithTime(true)
				availableTo = getAvailableHours(timedDates[+toStart])
				if (+fromStart === +toStart && startTime) {
					availableTo = getAvailableHours(timedDates[+toStart])
						.filter(hour => hour > +startTime)
						.filter((hour, idx) => hour - idx === +startTime + 1)
				}
			}
			setAvailableHours(prevState => {
				return {
					...prevState,
					end: availableTo
				}
			})
			setEndTime(availableTo[0])
		}
		setDates([fromStart, validSelected ? to : null]);
	}

	function selectTime(event) {
		if (event.target.id === 'timeFrom') {
			if (dates[1]) {
				let fromStart = moment(dates[0]).startOf('day')
				let startTime = +event.target.value
				let availableTo = timedDates[+fromStart] ? getAvailableHours(timedDates[+fromStart]) : getAvailableHours([])
				if (moment(dates[0]).isSame(moment(dates[1]), 'day')) {
					availableTo = availableTo
						.filter(hour => hour > +startTime)
						.filter((hour, idx) => hour - idx === +startTime + 1)
				}
				setAvailableHours(prevState => {
					return {
						...prevState,
						end: availableTo
					}
				})
				setEndTime(availableTo[0])
			}
			setStartTime(event.target.value)
		}
		else if (event.target.id === 'timeTo') {
			setEndTime(event.target.value)
		}
	}

	// function dateTemplate(date) {
	// 	if (date.day > 10 && date.day < 15) {
	// 		return (
	// 			// <div style={{ backgroundColor: '#1dcbb3', color: '#ffffff', /*fontWeight: 'bold',*/ borderRadius: '50%', /*width: '2em', height: '2em', lineHeight: '2em',*/ padding: 0 }}>{date.day}</div>
	// 			<span style={{ border: '1px solid #003580', borderRadius: '3px', boxSizing: 'border-box' }}>{date.day}</span>
	// 		);
	// 	}
	// 	else {
	// 		return date.day;
	// 	}
	// }

	function clearSelectedDates() {
		setDates([]);
		setWithTime(false);
		setStartTime(0);
		setEndTime(0);
	}

	function changeInput(event) {
		if (fieldError) setFieldError('')
		setTitle(event.target.value)
	}

	function clickShowTickets() {
		routerProps.history.push(`/tickets/${hall._id}`);
	}

	function clickBackButton() {
		if (editMode) {
			routerProps.history.push(`/tickets/${hall._id}`);
		} else {
			routerProps.history.push('/');
		}
	}

	function clickCancelButton(event) {
		event.preventDefault();
		clickBackButton();
	}

	function clickAddTicket(event) {
		event.preventDefault();
		if (!title) {
			setFieldError('Field is required')
			return;
		}
		if (!dates.length) {
			messageSetError(['Select dates!'])
			return
		};
		if (!dates[1]) {
			messageSetError(['Select second dates!'])
			return
		};
		let from = dates[0];
		let to = dates[1] || moment(from).startOf('days').toDate();
		if (withTime) {
			from.setHours(startTime ? +startTime : 0);
			to.setHours(endTime ? +endTime : 23);
		}
		// console.log(moment(from).toDate())
		// console.log(moment(to).toDate())
		let body = {
			hall_id: hall._id,
			user_id: user,
			from: +from,
			to: +to,
			title: title,
		};
		if (editMode) {
			updTicket(activeTicket._id, body);
			routerProps.history.push(`/tickets/${hall._id}`);
		} else {
			addTicket(body);
			clearSelectedDates();
		}
	}

	const minDate = moment();
	const maxDate = moment().add(1, "M");
	const timedDates = getTimedDates();

	if (hall) {
		return (
			<div className='hall-book-wrapper'>
				<button className='booking-button' onClick={clickBackButton}>Back</button>
				<div className='hall-card-container'>
					<HallCard hall={hall} />
					{user && hasTickets &&
						<div>
							<button className='booking-button' onClick={clickShowTickets}>My tickets</button>
						</div>
					}
				</div>
				<form className='book-form' onSubmit={e => e.preventDefault()} >
					{user && (
						<div className='input-wrapper'>
							<label className='input-label' htmlFor="title">Title: </label>
							<input
								className={'input-field' + (fieldError ? ' error' : '')}
								type="text"
								id="title"
								value={title}
								onChange={changeInput}
							/>
							<div className={'input-error' + (fieldError ? ' error' : '')}>Field is required</div>
						</div>
					)}
					{user && (
						<div>
							<div className='ticket-date'>{'From: ' + (dates[0] ? moment(dates[0]).format('YYYY-MM-DD HH:mm') : 'select date')}</div>
							<div className='ticket-date'>{'To: ' + (dates[1] ? moment(dates[1]).format('YYYY-MM-DD HH:mm') : 'select date')}</div>
						</div>
					)}
					<div className='calendar-container'>
						<Calendar
							disabled={user ? false : true}
							inline={true}
							selectionMode="range"
							numberOfMonths={2}
							minDate={minDate.toDate()}
							maxDate={maxDate.toDate()}
							showOtherMonths={false}
							selectOtherMonths={false}
							disabledDates={setDisabledDates()}
							value={dates}
							onChange={e => selectDate(e.value)}
						/>
						<div className='timepicker-panel'>
							<div>
								<input
									className='input-field'
									type="checkbox"
									name="time"
									id="time"
									disabled={!dates[0] || (editMode && withTime)}
									checked={withTime}
									onChange={e => setWithTime(e.target.checked)}
								/>
								<label className={'input-label inline-label' + (!dates[0] || (editMode && withTime) ? ' disabled' : '')} htmlFor="time">By time</label>
							</div>
							{withTime && (
								<TimePicker
									id={'timeFrom'}
									label="From time:"
									availableHours={availableHours.start}
									disabled={!dates[0]}
									value={startTime}
									onChange={selectTime}
								/>
							)}
							{withTime && (
								<TimePicker
									id={'timeTo'}
									label="To time:"
									availableHours={availableHours.end}
									disabled={!dates[1] || !startTime}
									value={endTime}
									onChange={selectTime}
								/>
							)}
						</div>
					</div>
					{user && (
						<div className='button-panel'>
							<div>
								<button className='booking-button' onClick={clearSelectedDates}>Clear</button>
								<button className='booking-button' onClick={clickAddTicket}>{editMode ? 'Save' : 'Book'}</button>
							</div>
							<div>
								<button className='booking-button' onClick={clickCancelButton}>Cancel</button>
							</div>
						</div>
					)}
				</form>
			</div>
		);
	}

	return <ProgressSpinner />;
}

const mapStateToProps = (state, ownProps) => {
	let hallId = ownProps.routerProps.match.params.hallId;
	let userId = state.user.id;
	let hasTickets = state.tickets.some(ticket => ticket.hall_id === hallId && ticket.user_id === userId)
	let activeTicket = state.activeTicket ? state.tickets.find(ticket => ticket._id === state.activeTicket) : null
	return {
		user: userId,
		hasTickets,
		activeTicket,
		hall: state.halls.find(hall => hall._id === hallId),
		tickets: state.tickets.filter(ticket => ticket.hall_id === hallId),
	};
};

const mapDispatchToProps = {
	setActiveTicket,
	addTicket,
	updTicket,
	messageSetSuccess,
	messageSetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(HallBook);
