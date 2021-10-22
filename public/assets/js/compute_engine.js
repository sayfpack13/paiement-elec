function compute_engine(){
	ReactDOM.render(<ComputeEngine />,document.getElementById("container"));
}

    window.reactInit = {
        cpu_price: 5
    };
	
	class ComputeEngine extends React.Component{
		constructor(props){
			super(props);
			
			this.state={prices:{cpu:reactInit.cpu_price,ram:3},vm:{cpu:1},cost:reactInit.cpu_price};
			
		}
		
		
		update_cpu=(event)=>{
			var vm_cpu=event.target.value;
			var vm_new_cpu=vm_cpu-this.state.vm.cpu;
			var vm_cost=this.state.prices.cpu*vm_new_cpu;
			
			
			this.setState({cost:this.state.cost+vm_cost,vm:{cpu:vm_cpu}});
		}
		
		
		addToCart=()=>{
			window.parent.document.getElementById("test").innerHTML=1;
			// make xhr request to save data in php

		}
		
		render(){
			return(
			<>
			
			<h1>Name</h1>
			<input type="text" placeholder="instance-1"></input>
			
			<h1>Machine Type</h1>
			<h3>Cpu</h3>
			<input type="range" min="1" max="24" step="1" value={this.state.vm.cpu} onChange={this.update_cpu}></input>
			<div>{this.state.vm.cpu}</div>
			
			
			
			<h1>Cost</h1>
			<div>$ {this.state.cost}</div>
			
			<button className="ripple-btn" onClick={this.addToCart}>Create</button>
			
			</>
			);
		}
	}
	
