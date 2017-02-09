
//basic text block
//includes optional title and optional additional classes
var TextBlock = React.createClass({displayName: 'TextBlock',
    render: function(){
        var title = '';
        if(this.props.data.title){
            title = <h2 className='b-title'>{this.props.data.title}</h2>;
        }
        return (
            <div className={classCol + this.props.data.width}>
                <div className={'block block-text ' + this.props.data.classes}>
                    {title}
                    <div className='b-content' dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
                </div>
            </div>
        );
    }
});
