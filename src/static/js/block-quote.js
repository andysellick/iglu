
var QuoteBlock = React.createClass({displayName: 'QuoteBlock',
    render: function(){
        var title = '';
        if(this.props.data.title){
            title = <h2 className='b-title'>{this.props.data.title}</h2>
        }
        var citation = '';
        if(this.props.data.citation){
            citation = <cite className='b-cite'>{this.props.data.citation}</cite>
        }
        return (
            <div className={classCol + this.props.data.width}>
                <div className={'block block-quote ' + this.props.data.classes}>
                    {title}
                    <blockquote className='b-quote'>
                        <span className='b-text'>{this.props.data.content}</span>
                        {citation}
                    </blockquote>
                </div>
            </div>
        );
    }
});
