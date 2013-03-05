/* Ryan Wahle */
/* MIU 1303   */
/* Project 1  */

function $ (element)
{
	return document.getElementById(element);
}

function validateTVShowFormFields ()
{
	var errorMessagesArray = [];
	
	// Reset the formErrors data to be blank
	resetFormErrors();
	
	// Validate the individual form fields that require validation
	var regEx = /\S/;
	if (!regEx.exec($("showName").value)) {
		errorMessagesArray.push("Please enter the Show Name");
		$("showName").style.border = "1px solid red";
		$("showName").value = "";
	} 

	var regEx = /^\d{1,2}:\d{2}$/;
	if (!regEx.exec($("time").value)) {
		errorMessagesArray.push("Please select a Time or enter in 24HR format: HH:MM");
		$("time").style.border = "1px solid red";
	} 

	var regEx = /^\d{4}-\d{1,2}-\d{1,2}$/;
	if (!regEx.exec($("startingDate").value)) {
		errorMessagesArray.push("Please select a Starting Date or enter in format: YYYY-MM-DD");
		$("startingDate").style.border = "1px solid red";
	} 

	var regEx = /\S/;
	if (!regEx.exec($("description").value)) {
		errorMessagesArray.push("Please enter the Description");
		$("description").style.border = "1px solid red";
		$("description").value = "";
	} 

	// Check if any errors
	if (errorMessagesArray.length > 0) {
		// We have errors so don't save and show errors to user.
		for (var i = 0; i < errorMessagesArray.length; i++) {
			var errorTagLI = document.createElement("li");
			errorTagLI.innerHTML = errorMessagesArray[i];
			$("formErrors").appendChild(errorTagLI);
		}
	} else {
		// No Errors. Save the TV Show
		saveTVShow(this.key);
	}
}

// This function removes all errors from previous actions
// and also resets the form borders to black in case they were red.
//
// Why? Because I noticed if you get errors and do nothing about it,
//		then go edit a TV Show, the errors still show on the initial
//		edit screen.
//
//		So instead of putting this code in only the validate function
//		I am also putting it in the edit function.
function resetFormErrors ()
{
	$("formErrors").innerHTML = "";
	$("showName").style.border = "1px solid black";
	$("time").style.border = "1px solid black";
	$("startingDate").style.border = "1px solid black";
	$("description").style.border = "1px solid black";
}

function saveTVShow (localStorageKey)
{
	var myTVShow = {
			showName: $("showName").value,
			dayOfWeek: $("dayOfWeek").value,
			time: $("time").value,
			favorite: $("favorite").checked,
			rating: $("rating").value,
			startingDate: $("startingDate").value,
			description: $("description").value
	};
	
	// If no key, then we are adding a new TV Show.
	// If key, then we are saving an edit.
	if (!localStorageKey) {
		var key = Math.floor(Math.random()*10000000001);
		var alertMessage = "Thank you for adding a TV Show";
	} else {
		var key = localStorageKey;
		var alertMessage = "Your edits to the TV Show have been saved";
	}
	
	localStorage.setItem(key, JSON.stringify(myTVShow));
	
	// Tell the user we saved some data and reload blank page
	alert(alertMessage);
	window.location.reload();
}

function clearStoredData ()
{
	if (localStorage.length === 0) {
		alert("There is no data to clear!");
	} else {
		var clearStoredDataConfirmation = confirm("Are you sure you want to clear all the data?");
		
		if (clearStoredDataConfirmation) {
			localStorage.clear();
			window.location.reload();
		}
	}
}

function displayData ()
{
	var localStorageLength = localStorage.length;
	
	if (localStorageLength > 0) {
		// Hide the form, hide the display data link, and show the add tv show button
		$("addTVShowForm").style.display = "none";
		$("displayDataLink").style.display = "none";
		$("addTVShowLink").style.display = "inline";
		
		var sectionListTVShows = document.createElement("section");
		sectionListTVShows.setAttribute("id", "sectionListTVShows");
		
		// Create the new html so we can display the data
		for (var i = 0; i < localStorageLength; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var myTVShow = JSON.parse(value);
		
			var tagTVShowList = document.createElement("ul");
			tagTVShowList.setAttribute("id", "itemTVShow");
			

			tagTVShowList.appendChild(createElementLI("Show Name: " + myTVShow.showName, "itemTVShowHeader"));
			tagTVShowList.appendChild(getImageLI(myTVShow.dayOfWeek));
			tagTVShowList.appendChild(createElementLI("Time: " + myTVShow.time, "itemTVShowDetail"));
			tagTVShowList.appendChild(createElementLI("Favorite: " + myTVShow.favorite, "itemTVShowDetail"));
			tagTVShowList.appendChild(createElementLI("Rating: " + myTVShow.rating, "itemTVShowDetail"));
			tagTVShowList.appendChild(createElementLI("Starting Date: " + myTVShow.startingDate, "itemTVShowDetail"));
			tagTVShowList.appendChild(createElementLI("Description: " + myTVShow.description, "itemTVShowDetail"));
			
			var linksLI = createElementLI("");
			linksLI.appendChild(createDeleteLink("Delete TV Show", key));
			linksLI.appendChild(createEditLink("Edit TV Show", key));				

			tagTVShowList.appendChild(linksLI);
						
			// Put it all the added HTML to the page!
			sectionListTVShows.appendChild(tagTVShowList);
			
			$("mainSection").appendChild(sectionListTVShows);
		}
	} else {
		var addJSONDataConfirmation = confirm("There are currently no TV Shows to display. Would you like to load some pre-defined data?");
	
		if (addJSONDataConfirmation) {
			for (var tvShowObjectKey in jsonFakeData) {
				var fakeTVShowObject = jsonFakeData[tvShowObjectKey];
				var key = Math.floor(Math.random() * 10000000001);
				localStorage.setItem(key, JSON.stringify(fakeTVShowObject));
			}
			
			alert ("The pre-defined data has been loaded.");
			
			displayData();
		}
	}
}

function getImageLI (dayOfWeek)
{
	var imageTag = document.createElement("img");
	imageTag.setAttribute("src", "img/" + dayOfWeek + ".png");

	var imageLI = createElementLI("", "itemTVShowDetail");
	imageLI.appendChild(imageTag);
	
	return imageLI;
}

function deleteTVShow ()
{
	var deleteConfirmation = confirm("Are you sure you want to delete that TV Show?");
	
	if (deleteConfirmation) {
		localStorage.removeItem(this.key);
		window.location.reload();
	}
}

function editTVShow ()
{
	// Reset any form validation errors in case user went from not fixing
	// errors to editing a TV Show
	resetFormErrors();

	// The rest of the function
	var myTVShow = JSON.parse(localStorage.getItem(this.key));
	
	$("showName").value = myTVShow.showName;
	$("dayOfWeek").value = myTVShow.dayOfWeek;
	$("time").value = myTVShow.time;
	$("rating").value = myTVShow.rating;
	$("startingDate").value = myTVShow.startingDate;
	$("description").value = myTVShow.description;
	
	if (myTVShow.favorite) {
		$("favorite").setAttribute("checked", "checked");
	}
	
	// Setup the save button for editing the tv show
	$("addTVShowButton").value = "Save";
	$("addTVShowButton").key = this.key;
	
	// Hide the listing and show the form with updated legend
	$("actionDescription").innerHTML = "Editing . . .";
	$("actionDescription").style.backgroundColor = "yellow";
	$("sectionListTVShows").style.display = "none";
	$("addTVShowForm").style.display = "";
	
}

function createEditLink (text, key)
{
	var tag = document.createElement("a");
	tag.setAttribute("id", "showLink");
	tag.innerHTML = text;
	tag.href = "#";
	tag.key = key;
	tag.addEventListener("click", editTVShow);
	return tag;
}

function createDeleteLink (text, key)
{
	var tag = document.createElement("a");
	tag.setAttribute("id", "showLink");
	tag.innerHTML = text;
	tag.href = "#";
	tag.key = key;	
	tag.addEventListener("click", deleteTVShow);
	return tag;
}

function createElementLI (text, tagID)
{
	var tag = document.createElement("li");
	tag.innerHTML = text;
	tag.setAttribute("id", tagID);
	
	return tag;
}

function addDaysOfWeekSelectTag ()
{
	var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	var selectionLabel = $("dayOfWeekSelection");
	var selectTag = document.createElement("select");
	selectTag.setAttribute("id", "dayOfWeek");
	
	for (var i = 0; i < daysOfWeek.length; i++) {
		var optionTag = document.createElement("option");
		optionTag.value = daysOfWeek[i];
		optionTag.innerHTML = daysOfWeek[i];
		selectTag.appendChild(optionTag);
	}
	
	selectionLabel.appendChild(selectTag);
	
}


// This is our starting point (after the DOM loads)
function DOMLoaded ()
{
	// Add our select tag
	addDaysOfWeekSelectTag();

	// Add some event listeners
	var addTVShowButton = $("addTVShowButton");
	var clearStoredDataLink = $("clearStoredDataLink");
	var displayDataLink = $("displayDataLink");

	addTVShowButton.addEventListener("click", validateTVShowFormFields);
	clearStoredDataLink.addEventListener("click", clearStoredData);
	displayDataLink.addEventListener("click", displayData);
}

window.addEventListener("DOMContentLoaded", DOMLoaded);

