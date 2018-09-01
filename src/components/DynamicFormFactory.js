import React from "react";
import _ from "lodash";


class DynamicFormFactory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}



	formElements() {
		let config = this.props.config;

		let mapElements = config.map((c) => {
		let props = c.props || {};
		let target = c.key;
		let name = c.key;
		let value = c.key;

		let input = <input {...props}
                    	name={c.key}
                    	key={c.key}
                     	type={c.type}
                    	onChange={(e)=>{this.onChange(e, target)}}
                	/>;

        if (c.type == "textarea") {
            	return (
            		<textarea {...props}
            			
            			key={c.key}
                    	name={c.key}
                    	rows="5"
                    	onChange={(e)=>{this.onChange(e, target)}}
                />
                )
            }

            if (c.type == "radio") {
               input = c.options.map((o) => {
                   let checked = o.value == value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                    type={c.type}
                                    value={o.value}
                                    checked={checked}
                                    key={o.key}
                                    name={o.name}
                                    onChange={(e)=>{this.onChange(e, o.name)}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                    );
               });
               input = <div>{input}</div>;
            }

            if (c.type == "select") {
                input = c.options.map((o) => {
                    let checked = o.value == value;
                     return (
                            <option {...props}
                                value={o.value}
                                key={o.key}
                            >{o.value}</option>
                     );
                });

                input = <select value={value} onChange={(e)=>{this.onChange(e, c.key)}}>{input}</select>;
             }

             if (c.type == "checkbox") {
                input = c.options.map((o) => {
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true: false;
                    }

                     return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input {...props}
                                checked={checked}
                                value={o.value}
                                type={c.type}
                                key={this.state[o.key]}
                                name={c.value}
                                onChange={(e)=>{this.onChange(e, o.key,"multiple")}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                     );
                });

                input = <div>{input}</div>;

             }
        return(
        	<div key={"div"+c.key}>
        		<label key={"label" + c.key}
                        id={c.key}
        			   htmlFor={c.key}>
        			   {c.label}
        		</label>
        		{input}
        	</div>);
		})

		return mapElements;
	}



       onChange = (e, key,type="single") => {
        console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState({
                [key]: e.target.value  
            });
        } else {
            let found = this.state[key] ?  
                            this.state[key].find ((d) => d === e.target.value) : false;
            
            if (found) {
                let data = this.state[key].filter((d) => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                this.setState({
                    [key]: [e.target.value]
                });
            }
        }
    }



	onSubmit(e) {
		e.preventDefault();
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	}

	render() {
		let title = this.props.title || "Generated Form";
		return(
			<div>
				<h2>  {title}</h2>
				<h3> {JSON.stringify(this.state)}</h3>
				<form onSubmit={ (e) => { this.onSubmit(e) } } >
				{this.formElements()}
				<button type="submit"> Submit Form</button>
				</form>
			</div>)
	}
}

export default DynamicFormFactory;