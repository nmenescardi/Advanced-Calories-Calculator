/**
 * Wrapper function to safely use $
 */
function wppsWrapper( $ ) {
	var wpps = {

		/**
		 * Main entry point
		 */
		init: function () {
			wpps.prefix      = 'wpps_';
			wpps.templateURL = $( '#template-url' ).val();
			wpps.ajaxPostURL = $( '#ajax-post-url' ).val();

			wpps.registerEventHandlers();
		},

		/**
		 * Registers event handlers
		 */
		registerEventHandlers: function () {
			$( '#example-container' ).children( 'a' ).click( wpps.exampleHandler );
		},

		/**
		 * Example event handler
		 *
		 * @param object event
		 */
		exampleHandler: function ( event ) {
			alert( $( this ).attr( 'href' ) );

			event.preventDefault();
		}
	}; // end wpps

	$( document ).ready( wpps.init );

} // end wppsWrapper()

wppsWrapper( jQuery );




jQuery(document).ready(function( $ ) {
	
	
    $("#calculate-button").click(function(){
		
		cleanWarnings( $ );
		
		performCalculations( $ );
		
		$(".hidden-before-calculations").show();
		$('#thankYouBannerForm').hide();
	});
	
	
    $("#send-via-email-button").click(function(){
				
		var email = document.getElementById('send-via-email-input').value;

		// Check if empty of not
		if (email  === '') {
			alert('Email Field is empty. Please enter your Email');
			return false;
		}
		
		var bodyMessage = document.getElementById('weekly-table-container').innerHTML;
		

	
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			type: 'POST',
			data: 'action=email_to_visitor&bodyMessage='+bodyMessage+'&email='+email,
			beforeSend: function(){
				// SOME jQuery code
			},
			success: function(results){
				// Show the "thamk you" div and hide anything else
				$('#thankYouBannerForm').show();
			},
			error: function(){
				alert('Error! Please reload');
			},
			complete: function(){
				// SOME jQuery code
			}
		});
	
		
	});	
		
	

		
		
	
});



function performCalculations( jquery ){
	
	/* Get input values */
	
	var currentWeight = parseInt( jquery("#current-weight-input").val() );

	var workouts = parseInt( jquery("#how-many-workouts-input").val() );
	
	var gender = jquery('input[name=gender-radio-button]:checked').val();
	
	var weightGoal = jquery("#lose-or-maintain-input").val();
		
	var activity = jquery("#active-daily-basis-input").val();
	
	var proteinIntake = jquery("#protein-intake-input").val();

	
	
	/* Calculate partial results */
	
	var PALvalue = getPAL(activity, gender);
	
	var deficitOrSurplus = getDeficitOrSurplus(weightGoal);
	
	var waterLts = ( currentWeight * 33 ) / 1000;
	
	var aveDailyWorkoutCalories = ( ( workouts * 400 ) / 7 ).toFixed(2);
	
	var BMR = ( currentWeight * 2.2 * PALvalue );
	
	var BMRplusWorkouts = ( Number(aveDailyWorkoutCalories) + Number(BMR) ).toFixed(2);

	var caloriesGoal = ( getCaloriesGoal(deficitOrSurplus, BMRplusWorkouts, workouts, aveDailyWorkoutCalories, weightGoal) ).toFixed(2);
	
	var weeklyAllowance = ( caloriesGoal * 7 );

	var recommendedWaterInLts = ( ( currentWeight * 33 ) / 1000 ).toFixed(2);
	
	/* Set final results */
	
	// Initialize column values
	var columnCalories = new Array(7);
	var columnTraining = new Array(7);
	var columnProtein = new Array(7);
	var columnProteinCals = new Array(7);
	var columnCarbs = new Array(7);
	var columnCarbsCals = new Array(7);
	var columnFats = new Array(7);
	var columnFatsCals = new Array(7);
	
	
	var arraySize = 7;
	
	
	// Initialize fixed values
	var proteinFixedPerDay = currentWeight * proteinIntake;
	
	// 0 Monday, 1 Tuesday, ...
	for (var i = 0; i < arraySize; i++){
		
		columnCalories[i] = caloriesGoal;	
		
		columnTraining[i] = getIfWorkoutADay( i, workouts );	
		
		columnProtein[i] =  proteinFixedPerDay;	
		
		columnProteinCals[i] = proteinFixedPerDay * 4;	
		
		columnCarbsCals[i] = ( columnTraining[i] == "T" ) ? ( columnCalories[i] - columnProteinCals[i] ) / 2 : 200;	
		
		columnCarbs[i] = columnCarbsCals[i] / 4;	
			
		columnFatsCals[i] = columnCalories[i] - columnProteinCals[i] - columnCarbsCals[i];	
		
		columnFats[i] = columnFatsCals[i] / 9;	
		
	}

	
	
	
	/* Put results into table cells */
	
	var tableRows = document.getElementsByClassName("row-day");
	
	var tableCelds;	
	
	// Rows (Days)
	for (var i = 0; i < arraySize; i++){
		
		tableCelds = tableRows[i].getElementsByTagName("th");
		
		
		// There is 8 columns with values	
		
		tableCelds[1].innerHTML = columnCalories[i];
		
		tableCelds[2].innerHTML = columnTraining[i];
		
		tableCelds[3].innerHTML = ( columnProtein[i]  ).toFixed(2);

		tableCelds[4].innerHTML = ( columnProteinCals[i]   ).toFixed(2);
		
		tableCelds[5].innerHTML = ( columnCarbs[i]  ).toFixed(2);
		
		tableCelds[6].innerHTML = ( columnCarbsCals[i] ).toFixed(2);
		
		tableCelds[7].innerHTML = ( columnFats[i] ).toFixed(2);
		
		tableCelds[8].innerHTML = ( columnFatsCals[i] ).toFixed(2);
		
	
	}
	
	
	var recommendedWaterInLtsSpan = document.getElementById("recommended-water-in-lts");
	recommendedWaterInLtsSpan.innerHTML = recommendedWaterInLts;
		
		
		
		
		
	
	/* Perform Validations */
	var messageValidation = new Array();
	
	
	
	if( caloriesGoal < 1200 ){
		messageValidation.push("Warning: Your daily Calories intake is under 1200");
		jquery("#header-calories-cell").css("background-color", "red");
	}		
	if( !columnCarbs.every( checkCarbs ) ){
		messageValidation.push("Warning: Your daily Carbs intake is under 50");
		jquery("#header-carbs-cell").css("background-color", "red");
	}	
	if( !columnFats.every( checkFats ) ){
		messageValidation.push("Warning: Your daily Fats intake is under 40");
		jquery("#header-fats-cell").css("background-color", "red");
	}		


	
	
	if( messageValidation.length > 0 ){
		alert(messageValidation.join("\n"));
	}

}


function checkCarbs( carb ) {
    return carb >= 50;
}

function checkFats( fat ) {
    return fat >= 40;
}


function getPAL(activity, gender){
	
	var PALvaluesTableMale = [];
	PALvaluesTableMale[12] = 12;
	PALvaluesTableMale[13] = 13;
	PALvaluesTableMale[14] = 14;
	PALvaluesTableMale[15] = 15;
	PALvaluesTableMale[16] = 17;
	PALvaluesTableMale[17] = 18;
	PALvaluesTableMale[18] = 21;
	PALvaluesTableMale[19] = 23;	
	
	var PALvaluesTableFemale = [];
	PALvaluesTableFemale[12] = 12;
	PALvaluesTableFemale[13] = 13;
	PALvaluesTableFemale[14] = 14;
	PALvaluesTableFemale[15] = 15;
	PALvaluesTableFemale[16] = 16;
	PALvaluesTableFemale[17] = 17;
	PALvaluesTableFemale[18] = 18;
	PALvaluesTableFemale[19] = 20;

	
	if( gender=="male" ){
		return PALvaluesTableMale[activity];
	}else{
		return PALvaluesTableFemale[activity];
	}
}


function getDeficitOrSurplus(weightGoal){

	if( weightGoal < 0){
		return "Deficit";
	}else if( weightGoal > 0){
		return "Surplus";
	}else{
		return "Maintenance";
	}
}


function getCaloriesGoal(deficitOrSurplus, BMRplusWorkouts, workouts, aveDailyWorkoutCalories, weightGoal){

	
	var caloriesLimitSup = Number(BMRplusWorkouts) +  Number(workouts) +  Number(aveDailyWorkoutCalories);
		
	var DMorS = ( weightGoal < 0 ) ? weightGoal * ( -1 ) : weightGoal;
	
	var caloriesLimitInf = ( (caloriesLimitSup * DMorS ) / 100 ).toFixed(2);
	
	switch (deficitOrSurplus) {
		case "Deficit":
			return Number(caloriesLimitSup) - Number(caloriesLimitInf);
			break;
		
		case "Maintenance":
			return Number(caloriesLimitSup) + Number(caloriesLimitInf);
			break;	
			
		case "Surplus":
			return Number(caloriesLimitSup) + Number(caloriesLimitInf);
			break;	
	}
	
}


function getIfWorkoutADay( dayAsIndex, workoutsPerWeek ){
	
	// 0 Monday, 1 Tuesday, ...
	var matrix = new Array();
	matrix[0] = new Array("R","R","T","T","T","T","T");
	matrix[1] = new Array("R","T","R","T","T","T","T");
	matrix[2] = new Array("T","R","T","R","R","T","T");
	matrix[3] = new Array("R","T","R","T","T","T","T");
	matrix[4] = new Array("R","R","T","T","T","T","T");
	matrix[5] = new Array("R","R","R","R","R","T","T");
	matrix[6] = new Array("R","R","R","R","T","R","T");

	return matrix[dayAsIndex][--workoutsPerWeek];
}



function cleanWarnings( jquery ){
	
	jquery("#header-calories-cell").css("background-color", "white");

	jquery("#header-carbs-cell").css("background-color", "white");

	jquery("#header-fats-cell").css("background-color", "white");
	
}


