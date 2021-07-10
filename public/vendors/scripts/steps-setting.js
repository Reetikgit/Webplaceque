var selectedFile;
function readURL(input) {
				
	if (input.files && input.files[0]) {
	
	var reader = new FileReader();
	reader.onload = function (e) {
		$('#blah')
		.attr('src', e.target.result);
	};
	
	selectedFile=input.files[0];
	reader.readAsDataURL(input.files[0]);
	 
	}
}
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

	console.info( "This page is reloaded" );
	window.localStorage.removeItem("quizKey")
	window.localStorage.removeItem("QuizInfo")
	window.localStorage.removeItem("QuizQuestion")
	window.localStorage.removeItem("description")
	window.localStorage.removeItem("DriveKey")
	window.localStorage.removeItem("Driveinfo")
	
  } else {
	console.info( "This page is not reloaded");
  }
setTimeout(function(){
	let info =JSON.parse(window.localStorage.getItem("QuizInfo"))
	let description =(window.localStorage.getItem("description"))
	if(info){
		document.querySelector("#title").value=info.title
		document.querySelector("#sttime").value=info.startTime
		document.querySelector("#endtime").value=info.endTime
		document.querySelector("#date").value=info.date
		document.querySelector("#total").value=info.total
		document.querySelector("#id").value=info.id
		document.querySelector("#branch").value=info.selectedBranches
		document.querySelector("#year").value=info.selectedYear
		
	}

	// if(description){
	// 	console.log(description)

	// 	document.querySelector("#instructions").value = description
	// }
		
	if(description){
		
		document.getElementById("instructions").value = description
		$("#instructions").data("wysihtml5").editor.setValue(description)
		// $('#instructions').text('It was a dark and stormy night…');
	}


},1000)

setTimeout(function(){
	let Driveinfo =JSON.parse(window.localStorage.getItem("Driveinfo"))
	if(Driveinfo){
		document.querySelector("#name").value = Driveinfo.name
			document.querySelector("#url").value = Driveinfo.url
			document.querySelector("#jobTitle").value =Driveinfo.jobTitle
		
			document.querySelector("#package").value=Driveinfo.package
			document.querySelector("#application").value =Driveinfo.application
			document.querySelector("#comments").value = Driveinfo.comments
			document.querySelector("#date").value = Driveinfo.date
			document.querySelector("#time").value = Driveinfo.time
			document.getElementById("blah").src=Driveinfo.photoUrl
			document.getElementById("description").value = Driveinfo.description
			$("#description").data("wysihtml5").editor.setValue(Driveinfo.description)
							
		
	}

},1000)

$(".tab-wizard").steps({
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> #title#',
	labels: {
		finish: "Submit"
	},
	onStepChanged: function (event, currentIndex, priorIndex) {
	if(currentIndex != 1 && currentIndex !=2 && currentIndex !=3){
	

	}
	if(currentIndex == 1){
		let ques =JSON.parse(window.localStorage.getItem("QuizQuestion"))
		if(ques){
			document.getElementById("addedQuestion").innerHTML="";
			for(var index2 in ques ){
				let key=ques[index2];
				document.getElementById("addedQuestion").innerHTML+=`
				<a href="javascript:void(0))" class="list-group-item list-group-item-action flex-column align-items-start">
					<h5 class="mb-1 h5">Question  `+ (index2++) +`: `+key.question+`</h5>
					
					<div class="options" style="padding:10px;">
						<input type="`+key.type+`" value="`+key.op1+`">`+key.op1+`<br>
						<input type="`+key.type+`" value="`+key.op2+`">`+key.op2+`<br>
						<input type="`+key.type+`" value="`+key.op3+`">`+key.op3+`<br>
						<input type="`+key.type+`" value="`+key.op4+`">`+key.op4+`<br>
						<input type="`+key.type+`" value="`+key.op5+`">`+key.op5+`<br>
						
					</div>
					
				</a>
				`
			
			}
		}
	}
	if(currentIndex == 3){
		let quizkey = window.localStorage.getItem("quizKey")
		let instruction= $("#instructions").data("wysihtml5").editor.getValue()
		if(instruction !=""){
			let ins ={
				"instruction" :instruction
			}
			let refDb = firebase.database().ref("quizData").child(quizkey).update(ins).then(function(){
				
			})

			
		}
	}
	let QuizInfo =window.sessionStorage.getItem("QuizInfo") ? window.sessionStorage.getItem("QuizInfo") : window.localStorage.getItem("QuizInfo")

	if(QuizInfo == undefined ){
	
		const convertTime12to24 = (time12h) => {
			const [time, modifier] = time12h.split(' ');
		  
			let [hours, minutes] = time.split(':');
		  
			if (hours === '12') {
			  hours = '00';
			}
		  
			if (modifier === 'PM' || modifier === 'pm' ) {
			  hours = parseInt(hours, 10) + 12;
			}
		  
			return `${hours}:${minutes}`;
		  }
		  
		let title=document.querySelector("#title").value
		let startTime=convertTime12to24(document.querySelector("#sttime").value)
		let endTime=convertTime12to24(document.querySelector("#endtime").value)
		let date=document.querySelector("#date").value
		let total=document.querySelector("#total").value

		let cn=convertTime12to24(startTime)
		
		var selectedBranches = [];
		for (var option of document.getElementById('branch').options)
		{
			if (option.selected) {
				selectedBranches.push(option.value);
			}
		}
		var selectedYear = [];
		for (var option of document.getElementById('year').options)
		{
			if (option.selected) {
				selectedYear.push(option.value);
			}
		}
		let id=title.substring(0,2)+Math.floor(Math.random() * 1000) + 1;
		document.querySelector("#id").value=id
		let info ={
			id:id,
			title :title,
			startTime : startTime,
			endTime :endTime,
			date :date,
			total :total,
			selectedBranches :selectedBranches,
			selectedYear:selectedYear

		}
	
	
		window.sessionStorage.setItem("QuizInfo",JSON.stringify(info))
		let refDb = firebase.database().ref("quizData")
		
		let form = refDb.push()
		let key = form.key

		window.localStorage.setItem("quizKey",key)
		let newForm = form.set({
			info,
			"key" : form.key
			
		}).then(function(){
			console.log("Done")
			
		})
	}else{
		
		const convertTime12to24 = (time12h) => {
			const [time, modifier] = time12h.split(' ');
		  
			let [hours, minutes] = time.split(':');
		  
			if (hours === '12') {
			  hours = '00';
			}
		  
			if (modifier === 'pm') {
			  hours = parseInt(hours, 10) + 12;
			}
		  
			return `${hours}:${minutes}`;
		  }
		  
		
		let title=document.querySelector("#title").value
		let startTime=convertTime12to24(document.querySelector("#sttime").value)
		let endTime=convertTime12to24(document.querySelector("#endtime").value)
		let date=document.querySelector("#date").value
		let total=document.querySelector("#total").value
		let id=document.querySelector("#id").value
		var selectedBranches = [];

		let description =window.localStorage.getItem("description")

		for (var option of document.getElementById('branch').options)
		{
			if (option.selected) {
				selectedBranches.push(option.value);
			}
		}
		var selectedYear = [];
		for (var option of document.getElementById('year').options)
		{
			if (option.selected) {
				selectedYear.push(option.value);
			}
		}
		let quizkey = window.localStorage.getItem("quizKey")
		let info ={
			info :{
				id:id,
				title :title,
				startTime : startTime,
				endTime :endTime,
				date :date,
				total :total,
				selectedBranches :selectedBranches,
				selectedYear:selectedYear
			}

		}
		window.localStorage.setItem("QuizInfo",JSON.stringify(info))
		let refDb = firebase.database().ref("quizData").child(quizkey).update(info).then(function(){
			console.log("Data")
		})

	}
		
		$('.steps .current').prevAll().addClass('disabled');
	},
	onFinished: function (event, currentIndex) {
		$('#success-modal').modal('show');
		let quizkey = window.localStorage.getItem("quizKey")
		let ins ={
			"status" :"active"
		}
		let refDb = firebase.database().ref("quizData").child(quizkey).update(ins).then(function(){
			
		})
	}
});

$(".tab-wizard2").steps({


	
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
	labels: {
		finish: "Submit",
		next: "Next",
		previous: "Previous",
	},
	onStepChanged: function(event, currentIndex, priorIndex) {
		
		$('.steps .current').prevAll().addClass('disabled');
	
		


	},
	onFinished: function(event, currentIndex) {
		$('#success-modal-btn').trigger('click');
		uploadFile()
		var urls2;
		function uploadFile(){
			
	
			var storageService = firebase.storage();
		
			var uploadTask=storageService.ref(`/DriveImages/${selectedFile.name}`).put(selectedFile);
			uploadTask.on('state_changed', function(snapshot){
				var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	
				// document.getElementById("uploadNow").innerHTML = progress;
					switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
					// document.getElementById("uploadNow").innerHTML = "Upload Paused";
					console.log('Upload is paused');
					break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
					// document.getElementById("uploadNow").innerHTML = progress+"%";
	
					break;
					}
					  },function(error){
						  console.log(error);
							// Handle unsuccessful uploads
						  }, function() {
					//   document.getElementById("uploadNow").innerHTML = "Uploaded"+ " "+progress+"%";
	
						 uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
					  
							urls2 = downloadURL;
						
							let name=document.querySelector("#name").value
							let url=document.querySelector("#url").value
							let jobTitle=document.querySelector("#jobTitle").value
							
							let description= $("#description").data("wysihtml5").editor.getValue()
							let package=document.querySelector("#package").value
							let application=document.querySelector("#application").value
							let comments=document.querySelector("#comments").value
							let date=document.querySelector("#date").value
							let time=document.querySelector("#time").value
							
							
							var selectedBranches = [];
							for (var option of document.getElementById('branch').options)
							{
								if (option.selected) {
									selectedBranches.push(option.value);
								}
							}
							var selectedYear = [];
							for (var option of document.getElementById('year').options)
							{
								if (option.selected) {
									selectedYear.push(option.value);
								}
							}
							var driveType = [];
							for (var option of document.getElementById('driveType').options)
							{
								if (option.selected) {
									driveType.push(option.value);
								}
							}
							let id=name.substring(0,2)+Math.floor(Math.random() * 1000) + 1;
							
							let Driveinfo ={
								id:id,
								name :name,
								url : url,
								jobTitle :jobTitle,
								date :date,
								time :time,
								selectedBranches :selectedBranches,
								selectedYear:selectedYear,
								driveType :driveType,
								application :application,
								package :package,
								description:description,
								comments : comments,
								photoUrl :urls2

							}
							let refDb = firebase.database().ref("driveData")
							let Driveinfo2 =JSON.parse(window.localStorage.getItem("Driveinfo"))
							if(Driveinfo2 !=undefined){
								let DriveKey=window.localStorage.getItem("DriveKey")
								let dd ={
									Driveinfo
								}
								firebase.database().ref("driveData").child(DriveKey).update(dd)
								console.log("done")
								window.location="upcomingDrive.html"
							}else{
								let form = refDb.push()

								let newForm = form.set({
									Driveinfo,
									"key" : form.key,
									time : new Date(),
									status :"active"
									
								}).then(function(){
									console.log("Done")
									$('#success-modal').modal('show');
									setTimeout(function(){
										window.location.reload()
									},3000)
							
								})
							}
							
					
						
	
					});
				})
		}
		
	
	}
});