/* Ryan Wahle */
/* MIU 1303   */
/* Project 3  */
 
var globalBrowseByDay;

/*
$('#pageHome').on('pageinit', function(){
	var myForm = $('#formSearch');
	myForm.validate({
		invalidHandler: function(form, validator) {
			// validation code goes here?
		},
		submitHandler: function() {
			//var data = myForm.serializeArray();
			//storeData(data);
			console.log("formSearch submitted");
		}
	});
});
*/

$('#pageHome').on('pageinit', function () {


// The user tried to search
$("#formSearch").submit(function() {
	$.mobile.changePage($("#pageSearch"));
	return false;
});

$('.browseDayGraphic').click(function() {
	globalBrowseByDay = this.id;
});

$("#pageBrowseShowsByDay").on("pageshow", function() {
	//console.log(this.id);
	$("#headerBrowseShowsByDay").text(globalBrowseByDay);
	$("#browseLists").empty();
	$("#browseLists").trigger("refresh");
	
	// Just search through JSON data since I can't access localStorage from addItem.html
	for (var tvShowObjectKey in jsonFakeData) {
		var fakeTVShowObject = jsonFakeData[tvShowObjectKey];

		if (globalBrowseByDay == fakeTVShowObject.dayOfWeek) {
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
			
			var temp = $("#browseLists");
			temp.append(tHTML);
			//$("#browseLists").trigger("create");
			$("#pageBrowseShowsByDay").trigger("create");
		}
		
	}
});

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

/*
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#formId');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});


//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};
*/

