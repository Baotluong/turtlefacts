(function(){
 
    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);
 
    QuizController.$inject = ['quizMetrics', 'DataService'];
 
    function QuizController(quizMetrics, DataService){
 
        var vm = this;
 		
 		vm.activeQuestion = 0;
 		vm.questionAnswered = questionAnswered;
        vm.quizMetrics = quizMetrics;
 		vm.DataService = DataService;
 		vm.setActiveQuestion = setActiveQuestion;
 		vm.selectAnswer = selectAnswer;
 		vm.error = false;
 		vm.finalize = false;
 		vm.finalizeAnswers = finalizeAnswers;

 		var numQuestionsAnswered = 0;

 		function setActiveQuestion(index){
 			if(index === undefined){
 				var quizLength = DataService.quizQuestions.length - 1;
	 			var breakOut = false;

	 			while(!breakOut){
	 				vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

	 				if(vm.activeQuestion === 0){
	 					vm.error = true;
	 				}

	 				if(DataService.quizQuestions[vm.activeQuestion].selected === null){
	 					breakOut = true;
	 				}
	 			}	
 			}else{
 				vm.activeQuestion = index;
 			}
 		}

 		function questionAnswered(){

 			var quizLength = DataService.quizQuestions.length;

 			if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
 				numQuestionsAnswered++;
 				if(numQuestionsAnswered >= quizLength){
 					for(var i=0; i < quizLength; i++){
 						if(DataService.quizQuestions[vm.activeQuestion].selected === null){
 							setActiveQuestion(i);
 							return;
 						}
 					}
 					vm.error = false;
 					vm.finalize = true;
 					return;
 				}
 			}

 			vm.setActiveQuestion();
 		}

 		function selectAnswer(index){
 			DataService.quizQuestions[vm.activeQuestion].selected = index;
 		}

 		function finalizeAnswers() {
 			vm.finalize = false;
 			vm.numQuestionsAnswered = 0;
 			vm.activeQuestion = 0;
 			quizMetrics.markQuiz();
 			quizMetrics.changeState("quiz", false);
 			quizMetrics.changeState("results", true);
 		}
    }
 
})();