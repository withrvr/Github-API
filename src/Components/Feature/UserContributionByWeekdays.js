import React from "react";
import { Col, Container, Spinner, Table } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "https://api.github.com/graphql",
		headers: {
			authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
		},
	}),
});

const fetchingQuery = gql`
	query user($username: String!) {
		user(login: $username) {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							contributionCount
							weekday
						}
					}
				}
			}
		}
	}
`;

export default class UserContributionByWeekdays extends React.Component {
	render() {
		return (
			<>
				<ApolloProvider client={client}>
					<Container className="text-center mt-3">
						<Query
							query={fetchingQuery}
							variables={{
								username: this.props.username,
								fromDate: this.props.fromDate,
								toDate: this.props.toDate,
							}}
						>
							{({ loading, error, data }) => {
								if (loading)
									return (
										<Spinner
											animation="border"
											variant="secondary"
										/>
									);
								if (error)
									return (
										<h5>
											Error! <br /> ${error.message}
										</h5>
									);

								let weekdaysContribution = [
									0, 0, 0, 0, 0, 0, 0,
								];
								let weekDays = [
									"Sunday",
									"Monday",
									"Tuesday",
									"Wednesday",
									"Thursday",
									"Friday",
									"Saturday",
								];

								data.user.contributionsCollection.contributionCalendar.weeks.forEach(
									(week) => {
										week.contributionDays.forEach(
											(days) => {
												weekdaysContribution[
													days.weekday
												] += days.contributionCount;
											}
										);
									}
								);

								return (
									<>
										<Col sm={6} className="mx-auto">
											<h3>
												Last 366 Days <br />
												Total Contribution -{" "}
												{
													data.user
														.contributionsCollection
														.contributionCalendar
														.totalContributions
												}
											</h3>

											<Table hover className="my-3">
												<thead>
													<tr>
														<th>Day</th>
														<th>Contribution</th>
													</tr>
												</thead>
												<tbody>
													{[...Array(7)].map(
														(value, index) => {
															return (
																<tr>
																	<td>
																		{
																			weekDays[
																				index
																			]
																		}
																	</td>
																	<td>
																		{
																			weekdaysContribution[
																				index
																			]
																		}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
											</Table>
										</Col>
										<Col sm={6} lg={4} className="mx-auto">
											<Pie
												className="mt-3 mb-5"
												data={{
													labels: weekDays,
													datasets: [
														{
															label: "Contribution Data",
															data: weekdaysContribution,
															backgroundColor: [
																"rgba(148, 0, 211, 0.2)",
																"rgba(75, 0, 130, 0.2)",
																"rgba(0, 0, 255, 0.2)",
																"rgba(0, 255, 0, 0.2)",
																"rgba(255, 255, 0, 0.2)",
																"rgba(255, 127, 0, 0.2)",
																"rgba(255, 0, 0, 0.2)",
															],
															borderColor: [
																"rgba(148, 0, 211, 0.5)",
																"rgba(75, 0, 130, 0.5)",
																"rgba(0, 0, 255, 0.5)",
																"rgba(0, 255, 0, 0.5)",
																"rgba(255, 255, 0, 0.5)",
																"rgba(255, 127, 0, 0.5)",
																"rgba(255, 0, 0, 0.5)",
															],
															borderWidth: 1,
														},
													],
												}}
											/>
										</Col>
									</>
								);
							}}
						</Query>
					</Container>
				</ApolloProvider>
			</>
		);
	}
}
