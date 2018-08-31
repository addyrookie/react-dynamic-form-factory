import React from "react";


class DynamicFormFactory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	formElements =() => {
		let config = this.props.config;

		let mapElements = config.map((c) => {
		let props = c.props || {};
		let target = c.key;

		let input = <input {...props}
                    	name={c.name}
                    	key={c.key}
                    	value={c.value}
                     	type={c.type}
                    	onChange={(e)=>{this.onChange(e, target)}}
                	/>;
        return(
        	<div>
        		<label key={"label" + c.key}
        			   htmlFor={c.key}>
        			   {c.label}
        		</label>
        		{input}
        	</div>);
		})

		return mapElements;
	}


	onSubmit = (e) => {
		e.preventDefault();
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	}

	render() {
		let title = this.props.title || "Generated Form";
		return(
			<div>
				<h2>{title}</h2>
				<form onSubmit={ (e) => { this.onSubmit(e) } } >
				 {this.formElements()}
				<button type="submit"> Submit Form</button>
				</form>
			</div>)
	}
}

export default DynamicFormFactory;