var IMGPATH = '/static/images/';

var ImageBlock = React.createClass({displayName: 'ImageBlock',
    getInitialState: function() {
        return {
            clicked: ''
        };
    },
    handleClick: function(){
        if(this.state.clicked === 1){
            this.state.clicked = 0;
        }
        else {
            this.state.clicked = 1;
        }
        this.setState();
    },
    render: function(){
        var caption;
        if(this.props.data.caption){
            caption = <figcaption className="b-caption">{this.props.data.caption}</figcaption>;
        }
        return (
            <div className={classCol + this.props.data.width}>
                <figure className={this.state.clicked ? 'block block-image selected ' : 'block block-image ' + this.props.data.classes}>
                    <img onClick={this.handleClick.bind(this)} className="b-image" src={IMGPATH + this.props.data.src} alt={this.props.data.alt}/>
                    {caption}
                </figure>
            </div>
        );
    }
});
