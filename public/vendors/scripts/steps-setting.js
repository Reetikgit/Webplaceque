
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

	console.info( "This page is reloaded" );
	window.localStorage.removeItem("quizKey")
	window.localStorage.removeItem("QuizInfo")
	window.localStorage.removeItem("QuizQuestion")
	window.localStorage.removeItem("description")
	
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
	
		alert(8)
		let title=document.querySelector("#title").value
		let startTime=document.querySelector("#sttime").value
		let endTime=document.querySelector("#endtime").value
		let date=document.querySelector("#date").value
		let total=document.querySelector("#total").value
		
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
		
		let title=document.querySelector("#title").value
		let startTime=document.querySelector("#sttime").value
		let endTime=document.querySelector("#endtime").value
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
	
	}
});