$(".tab-wizard").steps({
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> #title#',
	labels: {
		finish: "Submit"
	},
	onStepChanged: function (event, currentIndex, priorIndex) {

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
	
		window.localStorage.setItem("QuizInfo",JSON.stringify(info))
		
		$('.steps .current').prevAll().addClass('disabled');
	},
	onFinished: function (event, currentIndex) {
		$('#success-modal').modal('show');
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