
/* Generic functions */

//do an ajax request
function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

/* scroll detection variables */
var lastTop = 0;
var lastLeft = 0;
var scrollRegister = [];
var resizeTimeout;

/* className variables */
var classRow = 'row';
var classCol = 'span';

/* main code */

//this syntax is only possible because gulp-babel is installed and running through the gulp file
var Infographic = React.createClass({displayName: 'Infographic',
    //need to define the structure of the initial state otherwise breakage occurs
    getInitialState: function() {
        return {
            rows: []
        };
    },    
    componentDidMount: function() {
        callAjax(this.props.url,this.receiveAjaxRequest);
    },
    //process data received from ajax and set state
    receiveAjaxRequest: function(data){
        data = JSON.parse(data);
        this.setState({
            rows: data.rows
        });
    },
    //output the content
    render: function() {
        return (
            <div>
                {this.state.rows.map(function(row,i){
                    return (
                        <RenderRow data={row}/>
                    );
                },this)}
            </div>
        );
    }
});

var RenderRow = React.createClass({
	statics: {
		//find the offset position of a given element in the page, called by individual blocks
		//code to find leftpos currently removed as not in use
		findPos: function(obj) {
			//var curleft = 0
			var curtop = 0;
			if(obj.offsetParent){
				do {
					//curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
				//return [curleft,curtop];
				return(curtop);
			}
		},
		//called on page resize. Looks through elements in scrollRegister and recalculates their positions in the page
		resizeRecalulateScroll: function(){
			for(var z = 0; z < scrollRegister.length; z++){
				scrollRegister[z][1] = RenderRow.findPos(scrollRegister[z][0]) - scrollRegister[z][2];
			}
		}
	},
	componentWillMount: function(){
		//handle scroll event detection. Individual blocks will push their own functions onto the scrollRegister, which this will execute at the correct time
		document.addEventListener('scroll', function(e){
			//var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
			var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			if(Math.abs(scrollTop - lastTop) > 40){ //only run this if we've scrolled a reasonable distance
				for(var i = 0; i < scrollRegister.length; i++){
					var check = scrollRegister[i][1];
					if(check < scrollTop && check > lastTop){
						scrollRegister[i][3](scrollRegister[i][0]);
					}
					else if(check > scrollTop && check < lastTop){
						scrollRegister[i][4](scrollRegister[i][0]);
					}
				}
				lastTop = scrollTop;
			}
		});
		window.onresize = function(e){
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(RenderRow.resizeRecalulateScroll,500);
		}
	},
    render: function(){
        return (
            <div className={classRow}>
                {this.props.data.blocks.map(function(block,j){
                    if(block.type === 'text'){
                        return (
                            <TextBlock data={block}/>
                        );
                    }
                    else if(block.type === 'image'){
                        return (
                            <ImageBlock data={block}/>
                        );
                    }
                    else if(block.type === 'quote'){
                        return (
                            <QuoteBlock data={block}/>
                        );
                    }
                    else if(block.type === 'map'){
                        globalmapdata.push({block});
                        return (
                            <Map data={block} unique={globalmapdata.length - 1}/>
                        );           
                    }
                    else if(block.type === 'flow'){
                        return (
                            <FlowBlock data={block}/>
                        );
                    }
                    else if(block.type === 'statistic'){
                        return (
                            <StatisticBlock data={block}/>
                        );
                    }
                    else if(block.type === 'table'){
                        return (
                            <TableBlock data={block}/>
                        );
                    }
                    else {
                        console.log('block type not found: ' + block.type);
                    }
                }, this)}
            </div>
        );
    }
});

ReactDOM.render(
    <Infographic url='static/assets/data.json'/>,
    document.getElementById('content')
);



