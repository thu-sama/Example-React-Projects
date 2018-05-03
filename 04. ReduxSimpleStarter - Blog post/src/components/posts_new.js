import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
	renderField(field) {
		const {
			meta: { touched, error }
		} = field;
		const className = `form-group ${touched && error ? "has-danger" : ""}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, param => {
			this.props.history.push("/");
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="title"
					component={this.renderField}
					label="Title"
				/>
				<Field
					name="categories"
					component={this.renderField}
					label="Categories"
				/>
				<Field
					name="content"
					component={this.renderField}
					label="Post Content"
				/>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const error = {};

	var a = 1;
	var bbb = 2;

	if (!values.title) {
		error.title = "Enter a title!";
	}
	if (!values.categories) {
		error.categories = "Enter a categories!";
	}
	if (!values.content) {
		error.content = "Enter a content!";
	}

	// If error is empty, the form is fine to submit
	// If error has *any* properties, redux form assumes form is submit
	return error;
}

export default reduxForm({
	validate,
	form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
