(function(){
	angular
		.module("turtleFacts")
		.controller("resultsCtrl", ResultsController);

	ResultsController.$inject = ['quizMetrics', 'DataService']

	function ResultsController(quizMetrics, DataService){
		var vm = this;

		vm.quizMetrics = quizMetrics;
		vm.DataService = DataService;
		vm.activeQuestion = 0;
		vm.setActiveQuestion = setActiveQuestion;
		vm.getAnswerClass = getAnswerClass;
		vm.calculatePerc = calculatePerc;
		vm.reset = reset;

		function getAnswerClass(index){
			if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
				return "bg-success";
			}else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
				return "bg-danger";
			}
		}

		function setActiveQuestion(index){
			vm.activeQuestion = index;
		}

		function calculatePerc(){
			return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
		}

		function reset(){
			quizMetrics.changeState("results", false);
			quizMetrics.numCorrect = 0;

			for(var i=0; i<DataService.quizQuestions.length; i++){
				DataService.quizQuestions[i].selected = null;
				DataService.quizQuestions[i].correct = null;
			}
		}
	};
})();