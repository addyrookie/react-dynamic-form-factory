import React from "react";
import _ from "lodash";


class DynamicFormFactory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	formElements() {
		let properties = Object.values(this.props.config.properties);

		let mapElements = properties.map((p) => {

		let input = <input 
                    	name={p.title}
                    	key={p.title}
     			
                     	type={p.type}
                     	minLength={p.minLength}
                    	onChange={(e)=>{this.onChange(e)}}
                	/>;
        return(
        	<div>
        		<label key={"label" + p.title}
        			   htmlFor={p.title}>
        			   {p.title}
        		</label>
        		{input}
        	</div>);
		})

		return mapElements;
	}

	onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value  
            });
        } 

	onSubmit(e) {
		e.preventDefault();
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	}

	render() {
		let title = this.props.config.title;
		return(
			<div>
				<h2> {title} </h2>
				<h3> {this.props.config.description}</h3>
				<form onSubmit={ (e) => { this.onSubmit(e) } } >
				{this.formElements()}
				<button type="submit"> Submit Form</button>
				</form>
			</div>)
	}
}

export default DynamicFormFactory;