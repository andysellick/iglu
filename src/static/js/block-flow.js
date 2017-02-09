//flow or timeline block
var FlowBlock = React.createClass({displayName: 'FlowBlock',
	statics: {
		//called by the scroll controller
		onScrollOn: function(obj){
			obj.className = obj.className + ' scrollOn';
		},
		onScrollOff: function(obj){
			obj.className = obj.className.replace(/scrollOn/gi, '');
		}
	},
	//pass the rendered element to the controller that handles scroll detection
	componentDidMount: function(){
		var thisobj = ReactDOM.findDOMNode(this);
		var scrollOffset = 0;
		//add an optional offset to the scroll position, so events get triggered potentially sooner than when the element reaches the very top of the page
		if(this.props.data.scrollOffset){
			scrollOffset = parseInt(this.props.data.scrollOffset);
		}
		var position = RenderRow.findPos(thisobj);
		//scrollRegister gets passed the element itself, its position, an offset (defaulting to 0), a function for when the scroll reaches it and a function for when the scroll goes back up
		scrollRegister.push([thisobj,position - scrollOffset,scrollOffset,FlowBlock.onScrollOn,FlowBlock.onScrollOff]);
	},
    render: function(){
        return (
            <div className={classCol + this.props.data.width + ' block block-flow ' + this.props.data.classes}>
				{this.props.data.content.map(function(item,i){
					return (
						<div className={'b-item item-' + i}>
							{item}
						</div>
					);
				}, this)}
            </div>
        );
    }
});
