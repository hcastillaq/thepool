import React from "react";
import { Grid, Typography, Chip } from "@material-ui/core";
import { IPUBLICATIONMODEL } from './../store/models/publication.model';
import { Link } from 'react-router-dom';

class PublicationItemResult extends React.Component<any, any> {
	render() {
		const item = this.props.item;
		return (
			<div className="publication-item">
				<div className="publication-item__title">
					<Link to="">
						<Typography component="h5" variant="h6" color="primary" noWrap>
							{item.title}
						</Typography>
					</Link>
				</div>

				<div className="publication-item__date-author">
					<Grid container direction="row" justify="flex-start" item xs={12}>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							style={{ fontSize: ".8em" }}
						>
							{item.created_at} - By Hernan Castilla
						</Typography>
					</Grid>
				</div>

				<div className="publication-item__description">
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						style={{ margin: "10px 0px" }}
					>
						{item.description}
					</Typography>
				</div>

				<div className="publication-item__tags">
					<Grid container direction="row" justify="flex-start" spacing={1}>
						{item.tags.split(",").map((tag: String, index: any) => (
							<Grid item key={index}>
								<Chip label={tag} />
							</Grid>
						))}
					</Grid>
				</div>

			</div>
			// <Grid item xs={12} key={item.id} container>
			// 	<Grid item xs={12} sm={7}>
			// 		<Grid item xs={12}>
			// 			<Typography
			// 				component="h5"
			// 				variant="h6"
			// 				style={{ fontSize: "1em" }}
			// 				color="primary"
			// 				noWrap
			// 			>
			// 				{item.title}
			// 			</Typography>
			// 		</Grid>

			// <Grid container direction="row" justify="flex-start" item xs={12}>
			// 	<Typography
			// 		variant="subtitle1"
			// 		color="textSecondary"
			// 		style={{ fontSize: ".8em" }}
			// 	>
			// 		{item.created_at} - By Hernan Castilla
			// 	</Typography>
			// </Grid>

			// 		<Grid item xs={12}>
			// <Typography
			// 	variant="body2"
			// 	color="textSecondary"
			// 	component="p"
			// 	style={{ margin: "10px 0px" }}
			// >
			// 	{item.description}
			// </Typography>
			// 		</Grid>

			// <Grid container direction="row" justify="flex-start" spacing={1}>
			// 	{item.tags.split(",").map((tag, index) => (
			// 		<Grid item key={index}>
			// 			<Chip label={tag} />
			// 		</Grid>
			// 	))}
			// </Grid>
			// 	</Grid>
			// </Grid>
		);
	}
}

export default PublicationItemResult;
