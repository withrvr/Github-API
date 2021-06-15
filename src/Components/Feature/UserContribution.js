import React from "react";
import UserContributionByWeekdays from "./UserContributionByWeekdays";
import {
	Container,
	Row,
	Col,
	FormControl,
	InputGroup,
	Button,
} from "react-bootstrap";

export default class UserContribution extends React.Component {
	componentDidMount() {
		document.title = "User Contribution by Weekdays";
	}

	constructor(props) {
		super(props);

		this.state = {
			contributionContent: <h4>Fill all Fields and Click the button</h4>,
			username: "",
			fromDate: this.getFormatedDate(new Date(), -366),
			toDate: this.getFormatedDate(new Date(), 0),
		};
	}

	getFormatedDate(date, add) {
		let someDate = date;
		someDate.setDate(someDate.getDate() + add);
		return someDate.toISOString().substr(0, 10);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	showContributionContent = () => {
		if (
			this.state.username === "" ||
			this.state.fromDate === "" ||
			this.state.toDate === ""
		)
			this.setState({
				contributionContent: <h4>All fields are required</h4>,
			});
		else
			this.setState({
				contributionContent: (
					<UserContributionByWeekdays
						username={this.state.username}
						fromDate={this.state.fromDate}
						toDate={this.state.toDate}
					/>
				),
			});
	};

	render() {
		return (
			<>
				<Container className="text-center mt-3">
					<h3 className="mb-3">User Contribution by Weekdays</h3>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>
								https://github.com/
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							name="username"
							placeholder="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</InputGroup>
					<Row className="mb-3 d-none">
						<Col>
							<FormControl
								name="fromDate"
								type="date"
								placeholder="from date"
								value={this.state.fromDate}
								onChange={this.handleChange}
							/>
						</Col>
						<Col>
							<FormControl
								name="toDate"
								type="date"
								placeholder="to date"
								value={this.state.toDate}
								onChange={this.handleChange}
							/>
						</Col>
					</Row>

					<div className="d-flex align-items-end gap-2">
						<Button
							variant="success"
							className="ms-auto"
							// onClick={this.seeResultButton}
							onClick={this.showContributionContent}
						>
							See Result
						</Button>
					</div>

					<div className="mt-3">{this.state.contributionContent}</div>
				</Container>
			</>
		);
	}
}
