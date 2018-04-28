function ready(){
	//Using Ajax technology, we update the data without reloading the entire page
	//Ajax data request to determine the current location of the ISS
	$.ajax({
		url: 'http://api.open-notify.org/iss-now.json',
		type: 'GET',
		dataType: 'json',
		success: function coords(data){
			// console.log(data);
			//remembers the current coordinates of the ISS
			var myLatLng = {lat: +data.iss_position.latitude , lng: +data.iss_position.longitude};
			//Display the coordinates for the user
			$('#location').html("ISS in now located at:<br>latitude: "+ +data.iss_position.latitude +" ,  longitude: "+ +data.iss_position.longitude);
			//Display the usual time for the user
			$('#time').html('Currebt UTC time:<br>'+timeConverter(data.timestamp));
			//show map using google aps
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 3,
				center: myLatLng
			});
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
			});
		}
	});
	//ajax request for data to determine the number of astronauts on the ISS and their names
	$.ajax({
		url: 'http://api.open-notify.org/astros.json',
		type: 'GET',
		dataType: 'json',
		success: function coords(data){
			// console.log(data);
			$('#people').html('<p class="peopleTotal">Now on ISS: '+data.number+' astronauts</p>');
			//show the user of all astronauts on the ISS
			for(var i=0;i<data.number;i++){
				//"new name" to search on the wiki
				var newname = data.people[i].name.replace(/ /g,'_');
				$("#people").append('<p class="cell"><img height="64" src="http://icons.iconarchive.com/icons/martin-berube/people/256/astronaut-icon.png"><a href="https://en.wikipedia.org/wiki/'+newname+'" target="_blank">'+data.people[i].name+'</p>');
			}

		}
	});
	//update the data every 5 seconds
	setTimeout(ready,5000);
};
//first function call
ready();
//the function of time recalculation of the UNICS format at the usual time
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
