// gathering elements from index page
let add = document.getElementById('addbutton');
let mylist = document.getElementById('tasks');
let locate = document.getElementById('locationbutton');
locate.onclick = locateMe;
add.onclick = makeTask;
// check for empty or existing taskname
function makeTask() {
	let taskinput = document.getElementById('taskInput');
	// check for empty task name
	if(taskInput.value == "")
	{
		alert('Task Name cannot be empty');
	}
	else
	{
		// check for existsing task name
		var found = false;
		var checkTasks=mylist.querySelectorAll('li p');
		for( var i = 0; i<checkTasks.length; i++)
		{
			if(checkTasks[i].textContent === taskInput.value)
			{
				alert('Task present with same name');
				found = true;
				break
			}
		}
		
	if(!found)
	{
		// if task name can be added
		createNewTask();
	}
	}
}

function createNewTask()
{
	// eleemtns required for task
	let newtask = document.createElement('li');
	
	let check = document.createElement('input');
	newtask.appendChild(check);
	
	let name = document.createElement('p');
	newtask.appendChild(name);
	
	let btn = document.createElement('button');
	newtask.appendChild(btn);
	
	// element attributees
	check.type = 'checkbox';
	name.textContent = document.getElementById('taskInput').value;
	btn.textContent = 'Del'
	
	// checkbox and delte button listeners
	check.onclick = clickedCheckBox;
	btn.onclick = clickedDelete;
	// adding to list
	mylist.prepend(newtask);
}

function clickedCheckBox(evt) {
	
	if(evt.target.checked) {
	
	// if the task needs to show completed
		let task = evt.target.parentNode;
		task.style.textDecoration='line-through';
		task.style.backgroundColor = 'lightgreen'
		task.parentNode.appendChild(task);
	}
	else
	{
	// if the task needs to show incomplete again
		let task = evt.target.parentNode;
		task.style.textDecoration='';
		task.style.backgroundColor = 'white'
		task.parentNode.prepend(task);
	}
}

function clickedDelete(evt) {
	// removing by deleting parent li element 
	let task = evt.target.parentNode;
	task.parentNode.removeChild(task);
}

// used thirdparty google map, open map and geolocation api
function locateMe() {
	// function on success
	function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

// set values in map and map link
	var newmap = document.getElementById('map');
	var openmapLink = document.getElementById('maplink');
	newmap.style.width = '30%';
	newmap.style.height = '30%';
	newmap.style.float = 'center';
	openmapLink.style.display='block';
	// create a map
	var googlemap = new google.maps.Map(newmap, {
	center: {lat: latitude, lng: longitude},
	zoom: 8
		});
	openmapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	openmapLink.textContent = 'View On Open Map';
  }

// when not able to retrieve location
  function error() {
    alert('Unable to retrieve your location');
  }
// getting location co-ordinates using geolocation
  if(!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')	;
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}