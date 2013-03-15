/* Ryan Wahle */
/* MIU 1303   */
/* Project 2  */

$(document).ready(function() {
 
var globalBrowseByDay;

// The user tried to search
$("form").submit(function() {
	
	
	$.mobile.changePage($("#pageSearch"));
	return false;
});

// Browse Shows By Day
$("#browseMonday").click(function() {
	globalBrowseByDay = "Monday";
});

$("#browseTuesday").click(function() {
	globalBrowseByDay = "Tuesday";
});

$("#browseWednesday").click(function() {
	globalBrowseByDay = "Wednesday";
});

$("#browseThursday").click(function() {
	globalBrowseByDay = "Thursday";
});

$("#browseFriday").click(function() {
	globalBrowseByDay = "Friday";
});

$("#browseSaturday").click(function() {
	globalBrowseByDay = "Saturday";
});

$("#browseSunday").click(function() {
	globalBrowseByDay = "Sunday";
});

$("#pageBrowseShowsByDay").on("pageshow", function() {
	$("#headerBrowseShowsByDay").text(globalBrowseByDay);
	$("#browseLists").empty();
	$("#browseLists").trigger("refresh");
	
	var tHTML = "";
	tHTML += "<ul data-role=\"listview\">"
	
	// Just search through JSON data since I can't access localStorage from addItem.html
	for (var tvShowObjectKey in jsonFakeData) {
		var fakeTVShowObject = jsonFakeData[tvShowObjectKey];
		if (globalBrowseByDay == fakeTVShowObject.dayOfWeek) {
			tHTML += "	<li data-role=\"list-divider\">" + fakeTVShowObject.showName + "</li>";
			tHTML += "	<li>Time: " + fakeTVShowObject.time + "</li>";
			tHTML += "	<li>Day of Week: " + fakeTVShowObject.dayOfWeek + "</li>";
			tHTML += "	<li>Favorite: " + fakeTVShowObject.favorite + "</li>";
			tHTML += "	<li>Rating: " + fakeTVShowObject.rating + "</li>";
			tHTML += "	<li>Starting Date: " + fakeTVShowObject.startingDate + "</li>";
			tHTML += "	<li>Description: " + fakeTVShowObject.description + "</li>";
		}
	}
	
	tHTML += "</ul>";		
	console.log(tHTML);
	var temp = $("#browseLists");
	temp.append(tHTML);
	//$("#browseLists").trigger("create");
	$("#pageBrowseShowsByDay").trigger("create");
});

// Search for a show
$("#pageSearch").on("pageshow", function() {
	var searchText = $("#searchTVShows").val();
	$("#searchLists").empty();
	$("#searchLists").trigger("refresh");
	
	// Search through JSON data since I can't access localStorage from addItem.html
	for (var tvShowObjectKey in jsonFakeData) {
		var fakeTVShowObject = jsonFakeData[tvShowObjectKey];

		if (searchText.toUpperCase() == fakeTVShowObject.showName.toUpperCase()) {
			var tHTML = "";
			tHTML += tHTML + "<div data-role=\"collapsible\">";
			tHTML += "		<h4>" + fakeTVShowObject.showName + "</h4>";
			tHTML += "		<ul data-role=\"listview\">";
			tHTML += "			<li>Time: " + fakeTVShowObject.time + "</li>";
			tHTML += "			<li>Day of Week: " + fakeTVShowObject.dayOfWeek + "</li>";
			tHTML += "			<li>Favorite: " + fakeTVShowObject.favorite + "</li>";
			tHTML += "			<li>Rating: " + fakeTVShowObject.rating + "</li>";
			tHTML += "			<li>Starting Date: " + fakeTVShowObject.startingDate + "</li>";
			tHTML += "			<li>Description: " + fakeTVShowObject.description + "</li>";
			tHTML += "		</ul>";
			tHTML += "	</div>";
			
			var temp = $("#searchLists");
			temp.append(tHTML);
			//$("#searchLists").trigger("create");
			$("#pageSearch").trigger("create");
		}
		
	}
});

});


