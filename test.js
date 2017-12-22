$(document).ready(function(){

	var questions = [
		{
		    question: "What is 2*5?",
		    choices: [2, 5, 10, 15, 20],
		    correctAnswer: 10
	  	},
	  	{
		    question: "What is 3*6?",
		    choices: [3, 6, 9, 12, 18],
		    correctAnswer: 18
	    }, 
	    {
		    question: "What is 8*9?",
		    choices: [72, 99, 108, 134, 156],
		    correctAnswer: 72
	    },
	    {
	    	question: "What is 1*7?",
	    	choices: [4, 5, 6, 7, 8],
	    	correctAnswer: 7
	    }, 
	    {
	    	question: "What is 8*8?",
	    	choices: [20, 30, 40, 50, 64],
	    	correctAnswer: 64
	    }
	];


	var questionCounter = 0; //Tracks question number
 	var selections = []; //Array containing user choices

 	for(var i=0;i<5;i++){
 		selections[i]='Un answered';
 	}
 	var flag=0;
 	displayNext();
 	var m=5,s=60;


 	function startTimer(seconds, container, oncomplete) {
	    var startTime, timer, obj, ms = seconds*1000,
	        display = $("#mins");
	    obj = {};
	    obj.resume = function() {
	        startTime = new Date().getTime();
	        timer = setInterval(obj.step,250); // adjust this number to affect granularity
	                            // lower numbers are more accurate, but more CPU-expensive
	    };
	    obj.pause = function() {
	        ms = obj.step();
	        clearInterval(timer);
	    };
	    obj.step = function() {
	        var now = Math.max(0,ms-(new Date().getTime()-startTime)),
	            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
	        s = (s < 10 ? "0" : "")+s;
	        m = (m < 10 ? "0" : "")+m;
	        display.html(m+":"+s);
	        if( now == 0) {
	            clearInterval(timer);
	            obj.resume = function() {};
	            if( oncomplete) oncomplete();
	        }
	        return now;
	    };
	    obj.resume();
	    return obj;
	}

	var timer = startTimer(5*60, "timer", function() {alert("Time Up!"); $('#submit').click();});
	

 	$('#button_timer').on('click',function(e){
 		if(flag==0){
 			$("#icon_").removeClass("glyphicon-play");
 			$("#icon_").addClass("glyphicon-pause");
 			flag=1;
 			timer.pause();
 		}else{
 			$("#icon_").removeClass("glyphicon-pause");
 			$("#icon_").addClass("glyphicon-play");
 			flag=0;
 			timer.resume();
 		}
 	});
 	

 	$('#op1').on('click', function (e) {
  		var x= $('#option1').text();
  		selections[questionCounter]=x;
	});

	$('#op2').on('click', function (e) {
	   	var x= $('#option2').text();
		selections[questionCounter]=x;
	});

	$('#op3').on('click', function (e) {
	   	var x= $('#option3').text();
		selections[questionCounter]=x;
	});

	$('#op4').on('click', function (e) {
	   	var x= $('#option4').text();
		selections[questionCounter]=x;
	});

	$('#op5').on('click', function (e) {
	   	var x= $('#option5').text();
		selections[questionCounter]=x;
	});

	$('#qno').html(questionCounter+1);
	
	$('#next').on('click',function(){	
		
		if(questionCounter<=4){
		    	$('#quiz').fadeOut('slow');
		  		$('#quiz').fadeIn('slow');
		  		questionCounter++;
		  		$('#qno').html(questionCounter+1);
		  		displayNext();
		}

		if(questionCounter>=5){
			var r = confirm("Submit quiz ?");
			if (r == true) {
			    $('#submit').click();
			    questionCounter=0;
			    displayNext();
			} else {

			}
		}
	});

	$('#prev').on('click',function(){		
		
		if(questionCounter>=1){
		    	$('#quiz').fadeOut('slow');
		  		$('#quiz').fadeIn('slow');
		  		questionCounter--;
		  		$('#qno').html(questionCounter+1);
		  		displayNext();
		}
	});

	$('#submit').on('click',function(){
		
		var numCorrect = 0;
	    for (var i = 0; i < selections.length; i++) {
	      if (selections[i] == questions[i].correctAnswer) {
	        numCorrect++;
	      }
	    }

	    alert('Your score is : '+numCorrect+
	    	  '\nQ1 - Correct answer : '+questions[0].correctAnswer+' Your answer : '+selections[0]+
	    	  '\nQ2 - Correct answer : '+questions[1].correctAnswer+' Your answer : '+selections[1]+
	    	  '\nQ3 - Correct answer : '+questions[2].correctAnswer+' Your answer : '+selections[2]+
	   		  '\nQ4 - Correct answer : '+questions[3].correctAnswer+' Your answer : '+selections[3]+
	    	  '\nQ5 - Correct answer : '+questions[4].correctAnswer+' Your answer : '+selections[4]);

	    for(var i=0;i<5;i++){
 		selections[i]='Un answered';
 	}

	});


	function displayNext() {

	    if(questionCounter < questions.length){
	        $('#question').html(questions[questionCounter].question);
      		$('#option1').html(questions[questionCounter].choices[0]);
      		$('#option2').html(questions[questionCounter].choices[1]);
      		$('#option3').html(questions[questionCounter].choices[2]);
      		$('#option4').html(questions[questionCounter].choices[3]);
      		$('#option5').html(questions[questionCounter].choices[4]);
      	}
    }

    function pauseFunction(){

	    if(pause==0) 
	    {
	      clearInterval(mainTimer);
	      // document.getElementById("pause").innerHTML="Resume"
	      pause=1;
	      return;
	    }
	}
    
});
