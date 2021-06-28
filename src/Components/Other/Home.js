import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Image } from "react-bootstrap";

export default class Home extends React.Component {
	componentDidMount() {
		document.title = "Github API";
	}

	render() {
		return (
			<Container className="text-center vh-100">
				{/* image and heading */}
				<div>
					<Image
						src="/images/logo.png"
						alt="Github Logo"
						className="p-3"
						width="200px"
					/>
					<h1>Github API</h1>
				</div>

				{/* links of the games */}
				<Col lg={6} md={8} className="d-grid gap-2 mx-auto my-3">
					<Link
						to="/user-contribution"
						className="btn btn-outline-primary"
					>
						User Contribution by Weekdays
					</Link>
				</Col>

				{/* footer */}
				<footer>
					<span>Make with ❤️ by</span>
					<a
						className="text-decoration-none"
						href="https://github.com/withrvr"
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						@withrvr
					</a>
				</footer>
			</Container>
		);
	}
}
