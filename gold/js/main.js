/* Ryan Wahle */
/* MIU 1303   */
/* Project 4  */
 
var globalBrowseByDay;

$.mobile.changeGlobalTheme("a");

$('#pageItemForm').on('pageinit', function(){
	var myForm = $('#formItem');
	var dialogValidateErrorLink = $('#dialogValidateErrorLink');
	
	myForm.validate({
		invalidHandler: function(form, validator) {
			dialogValidateErrorLink.click();
			
			var tHTML = '';
			for (var mykey in validator.submitted) {
				var labelText = $('label.ui-input-text[for^="' + mykey + '"]');
				//console.log('Key: ' + mykey + ' labelText: ' + labelText.text())
				tHTML += '<li>' + labelText.text().slice(0, -1) + '</li>';
			}
			
			$('#dialogValidateError ul').html(tHTML);
		},
		submitHandler: function() {
			//var data = myForm.serializeArray();
			//storeData(data);
			storeData();
		}
	});
});

// <-- Browse Show by Day -->
$('.browseDayGraphic').click(function() {
	globalBrowseByDay = this.id;
});

$('#pageBrowseShowsByDay').on('pageshow', function() {
	$('#headerBrowseShowsByDay').text(globalBrowseByDay);
	$('#browseLists').empty();
	$('#browseLists').trigger('refresh');
	
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myTVShow = JSON.parse(value);
		
		if (globalBrowseByDay == myTVShow.dayOfWeek) {
			var tHTML = '';
			tHTML += tHTML + '<div data-role="collapsible">';
			tHTML += '		<h4>' + myTVShow.showName + '</h4>';
			tHTML += '		<ul data-role="listview" id="itemShow">';
			tHTML += '			<li><a href="#" id="editItem" key="' + key + '">Edit</a></li>';
			tHTML += '			<li><a href="#" id="deleteItem" key="' + key + '">Delete</a></li>';
			tHTML += '			<li>Time: ' + myTVShow.time + '</li>';
			tHTML += '			<li>Day of Week: ' + myTVShow.dayOfWeek + '</li>';
			tHTML += '			<li>Favorite: ' + myTVShow.favorite + '</li>';
			tHTML += '			<li>Rating: ' + myTVShow.rating + '</li>';
			tHTML += '			<li>Starting Date: ' + myTVShow.startingDate + '</li>';
			tHTML += '			<li>Description: ' + myTVShow.description + '</li>';
			tHTML += '		</ul>';
			tHTML += '	</div>';
			
			$('#browseLists').append(tHTML);
			$('#pageBrowseShowsByDay').trigger('create');
		}
	}
});

// <-- Edit Item -->
$('#editItem').live('click', function() {
	//console.log($(this).attr('key'));
	$.mobile.changePage('#pageItemForm');
	
	var key = $(this).attr('key');
	var value = localStorage.getItem(key);
	var myTVShow = JSON.parse(value);
		
	$('#pageItemForm #showName').val(myTVShow.showName);
	$('#pageItemForm #time').val(myTVShow.time);
	$('#pageItemForm #dayOfWeek').val(myTVShow.dayOfWeek).selectmenu('refresh');
	$('#pageItemForm #rating').val(myTVShow.rating).slider('refresh');
	$('#pageItemForm #startingDate').val(myTVShow.startingDate);
	$('#pageItemForm #description').val(myTVShow.description);
	$('#pageItemForm #key').val(key);
	
	if (myTVShow.favorite == "false") {
		$('#pageItemForm #favorite').attr('checked', false).checkboxradio('refresh');
	} else {
		$('#pageItemForm #favorite').attr('checked', true).checkboxradio('refresh');
	}
	
	$('#pageItemForm #headerItemForm').text('Edit Show');
	$('#pageItemForm #submitItemForm').val('Save').button('refresh');
});

// <-- Delete Item -->
$('#deleteItem').live('click', function() {
	var deleteConfirmation = confirm("Are you sure you want to delete this show??");
		
	if (deleteConfirmation) {
		localStorage.removeItem($(this).attr('key'));
		$.mobile.changePage('#pageHome');
	}
});

// <-- Defaults for Add Show Form -->
$('#addItemClick').click(function() {
	$.mobile.changePage('#pageItemForm');
	
	$('#pageItemForm #headerItemForm').text('Add Show');
	$('#pageItemForm #submitItemForm').val('Add Show').button('refresh');
	
	$('#pageItemForm #showName').val('');
	$('#pageItemForm #time').val('');
	$('#pageItemForm #dayOfWeek').val('').selectmenu('refresh');
	$('#pageItemForm #rating').val('3').slider('refresh');
	$('#pageItemForm #description').val('');
	$('#pageItemForm #key').val('');
	$('#pageItemForm #favorite').attr('checked', true).checkboxradio('refresh');
  	$('#pageItemForm #startingDate').val('');
});

// <-- Search -->
$('#formSearch').submit(function() {
	$.mobile.changePage($('#pageSearch'));
	return false;
});

$('#pageSearch').on('pageshow', function() {
	var searchText = $('#searchTVShows').val();
	$('#searchLists').empty();
	$('#searchLists').trigger('refresh');
	
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myTVShow = JSON.parse(value);
		
		if (globalBrowseByDay == myTVShow.dayOfWeek) {
			var tHTML = '';
			tHTML += tHTML + '<div data-role="collapsible">';
			tHTML += '		<h4>' + myTVShow.showName + '</h4>';
			tHTML += '		<ul data-role="listview" id="itemShow">';
			tHTML += '			<li><a href="#" id="editItem" key="' + key + '">Edit</a></li>';
			tHTML += '			<li><a href="#" id="deleteItem" key="' + key + '">Delete</a></li>';
			tHTML += '			<li>Time: ' + myTVShow.time + '</li>';
			tHTML += '			<li>Day of Week: ' + myTVShow.dayOfWeek + '</li>';
			tHTML += '			<li>Favorite: ' + myTVShow.favorite + '</li>';
			tHTML += '			<li>Rating: ' + myTVShow.rating + '</li>';
			tHTML += '			<li>Starting Date: ' + myTVShow.startingDate + '</li>';
			tHTML += '			<li>Description: ' + myTVShow.description + '</li>';
			tHTML += '		</ul>';
			tHTML += '	</div>';
			
			$('#searchLists').append(tHTML);
			$('#pageSearch').trigger('create');
		}
		
	}

});

// <-- Save Item to localStorage -->
function storeData ()
{
	var formKey = $('#formItem #key').val();
		
	var myTVShow = {
		'showName': $('#formItem #showName').val(),
		'dayOfWeek': $('#formItem #dayOfWeek').val(),
		'time': $('#formItem #time').val(),
		'favorite': $('#formItem #favorite').val(),
		'rating': $('#formItem #rating').val(),
		'startingDate': $('#formItem #startingDate').val(),
		'description': $('#formItem #description').val()
	};
	
	if (formKey == '') {
		// Adding an item
		var key = Math.floor(Math.random()*10000000001);
	} else {
		// Saving an edit
		var key = formKey;
	}
	
	localStorage.setItem(key, JSON.stringify(myTVShow));
	
	$.mobile.changePage('#pageHome');
}

// <-- Clear localStorage -->
$('#pageStorage #buttonClearLocalStorage').click(function() {
	if (localStorage.length == 0) {
		alert('There is no data to clear!');
	} else {
		var clearStoredDataConfirmation = confirm('Are you sure you want to clear all the data?');
		
		if (clearStoredDataConfirmation) {
			localStorage.clear();
		}
	}
});

// <-- Add JSON Data -->
$('#pageStorage #buttonLoadJSON').click(function() {
	if (localStorage.length > 0) {
		alert('There is already data in localStorage.\n\nClear the localStorage first if you wish to add JSON data!');
	} else {
		for (var tvShowObjectKey in jsonFakeData) {
			var fakeTVShowObject = jsonFakeData[tvShowObjectKey];
			var key = Math.floor(Math.random() * 10000000001);
			localStorage.setItem(key, JSON.stringify(fakeTVShowObject));
		}
		
		alert('The json.js file has been loaded into localStorage');
	}
	
});