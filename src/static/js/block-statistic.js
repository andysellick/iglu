
var StatisticBlock = React.createClass({displayName: 'StatisticBlock',
    render: function(){
        return (
            <div className={classCol + this.props.data.width}>
                <div className={'block block-statistic ' + this.props.data.classes}>
                	<div className='b-statistic-wrapper'>
                		<div className='b-number'>{this.props.data.value}</div>
                		<div className='b-text'>{this.props.data.text}</div>
	                </div>
                </div>
            </div>
        );
    }
});
