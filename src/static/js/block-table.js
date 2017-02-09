
var TableBlock = React.createClass({displayName: 'TableBlock',
    render: function(){
        var title = '';
        if(this.props.data.title){
            title = <h2 className='b-title'>{this.props.data.title}</h2>
        }
        return (
            <div className={classCol + this.props.data.width}>
                <div className={'block block-table ' + this.props.data.classes}>
                	{title}
                	<div className='b-table'>
                		<div className='thead'>
                			{this.props.data.headings.map(function(item,i){
								return (
									<div className='td'>
										{item}
									</div>
								);
							}, this)}
                		</div>
						{this.props.data.rows.map(function(item,i){
							return (
		                		<div className='tbody'>
		                			{item.map(function(subitem,i){
										return (
											<div className='td'>
												{subitem}
											</div>
										);
									}, this)}
		                		</div>
							);
						}, this)}
                	</div>
                </div>
            </div>
        );
    }
});
