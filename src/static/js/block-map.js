var globalmapdata = []; //holds the data for the map, as it cannot be accessed via props
var mapsloaded = 0;
var maps = []; //store the data for multiple maps
var timeout;

//google maps block, works in a slightly odd way as gmaps script has to be injected and support multiple maps
var Map = React.createClass({displayName: 'Map',
    statics: {
        //gmaps scripts inserted, now load the maps api
        loadMaps: function(){
            google.load('maps', '3', {'callback' : Map.mapLoaded});
        },
        //props are stored as a global variable as static functions can't access them and this has to be a static
        mapLoaded: function(){
            for(var i = 0; i < globalmapdata.length; i++){
                var thismap = globalmapdata[i];
                //initialise the map
                var map = {};
                map.mapid = 'gmap' + i;
                map.map = new google.maps.Map(document.getElementById('gmap' + i), {
                    center: {lat: thismap.block.lat, lng: thismap.block.lng},
                    zoom: thismap.block.zoom
                });      
                map.bounds = new google.maps.LatLngBounds(null);
                map.infowindow = new google.maps.InfoWindow();
                //get markers from data and insert
                for(var j = 0; j < thismap.block.markers.length; j++){
                    var marker = new google.maps.Marker({
                        position: {lat: thismap.block.markers[j].lat, lng: thismap.block.markers[j].lng},
                        map: map.map
                    });
                    marker.mapid = map.mapid; //custom attribute to identify the map later in the click function
                    map.bounds.extend(marker.position);
                    var content = thismap.block.markers[j].content;

                    //open infowindow when marker is clicked. Have to do slightly complex stuff to check which map we're on
                    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
                        return function() {
                            for(var q = 0; q < maps.length; q++){
                                if(maps[q].mapid === this.mapid){
                                    maps[q].infowindow.setContent(content);
                                    maps[q].infowindow.open(maps[q].map,marker);
                                    break;
                                }
                            }
                        };
                    })(marker,content,map.infowindow));
                }
                //close infowindow when map is clicked. Have to do slightly complex check to tell which map we're on
                google.maps.event.addListener(map.map, 'click', function() {
                    for(var p = 0; p < maps.length; p++){
                        if(maps[p].mapid === this.getDiv().id){
                            maps[p].infowindow.close();
                            break;
                        }
                    }
                });

                //add polylines if the data has them
                if(thismap.block.hasOwnProperty('lines')){
                    var lines = thismap.block.lines;
                    for(var m = 0; m < lines.length; m++){
                        var flightPath = new google.maps.Polyline({
                            path: lines[m].line,
                            geodesic: true,
                            strokeColor: lines[m].colour,
                            strokeOpacity: lines[m].opacity,
                            strokeWeight: lines[m].stroke
                        });
                        flightPath.setMap(map.map);
                    }
                }

                //now auto position the map, setTimeout is used to avoid a bug, but need to store maps and bounds because of this
                maps.push(map);
                clearTimeout(timeout); //to avoid duplicating the following
                timeout = setTimeout(function() {
                    for(var z = 0; z < maps.length; z++){
                        //console.log(maps[z]);
                        maps[z].map.fitBounds(maps[z].bounds);
                    }
                },1);
            }
        }
    },
    //inject gmaps scripts dynamically into the page and call map initialisation
    //map initialisation has to be a static as 'this' isn't recognised outside of this object
    componentWillMount: function(){    
        if(!mapsloaded){ //prevent gmaps from being loaded more than once
            mapsloaded = 1;
            var url = 'http://www.google.com/jsapi?key=AIzaSyBV9oifhxzU6wE_ElAecW0p_4W6_qxo1Dk&callback=Map.loadMaps';
            var script = document.createElement('script');
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    },
    render: function(){
        return (
            <div className={classCol + this.props.data.width}>
                <div className='block block-map'>
                    <div id={'gmap' + this.props.unique} className='map-content'></div>
                </div>
            </div>
        );
    }
});
