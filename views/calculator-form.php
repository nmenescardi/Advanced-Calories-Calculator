<?php
/**
 * Template Name: Calculator Form
 */
get_header();
?>
<div id="advanced-calories-calculator-container">
	<h1 class="top-space bottom-space">Advanced Calories Calculator</h1>
	<form>
		<div id="current-weight-container" class="one-third-width push-to-left bottom-space">
			<label for="current-weight-input">Current Weight (Kg's): </label>
			<input class="left-space centered-text-align" type="number" id="current-weight-input" min="0" value="80" >
		</div>
		<div class="one-third-width push-to-right bottom-space push-to-left">
			<label for="how-many-workouts-input">How Many Workouts Per Week: </label>
			<input class="left-space centered-text-align" type="number" id="how-many-workouts-input" min="1" max="7" value="4">
		</div>			
		<div id="gender-container" class="one-third-width text-to-right push-to-left bottom-space">
			<label for="gender-radio-button">Gender: </label>
			<input class="left-space" type="radio" name="gender-radio-button" value="male" checked><span>Male</span>
			<input class="left-space" type="radio" name="gender-radio-button" value="female"><span>Female</span><br>
		</div>
		<div class="clear-fix-both"></div>			
		<div class="bottom-space">
			<label for="lose-or-maintain-input">Do You Want To Lose, Maintain, or Gain Weight:</label>
			<input type="range" id="lose-or-maintain-input" value="0" min="-45" max="45" step="1">
			<span>-1kg Per Week</span><span class="push-to-right">+1kg Per Week</span>
		</div>
		<div class="clear-fix-both"></div>		
		<div class="bottom-space">
			<label for="active-daily-basis-input">How Active Are You on Daily Basis (PAL)</label>
			<input type="range" id="active-daily-basis-input" value="15" min="12" max="19" step="1">
			<span>Inactive (0 to 1,000 steps)</span><span class="push-to-right">Active (10,000 steps or more)</span>
		</div>
		<div class="bottom-space">
			<label for="protein-intake-input">How Much Protein Do You Want to Eat?</label>
			<input type="range" id="protein-intake-input" value="2.4" min="1.4" max="2.4" step="0.1">
			<span>Not a Lot</span><span class="push-to-right">Loads Please</span>
		</div>		
		<input id="calculate-button" type="button" value="Calculate">		
	</form>
	
	<div id="weekly-table-container" class="bottom-space">
		<table>
			  <tr id="weekly-table-row-header">
				<th></th>
				<th id="header-calories-cell">Calories</th>
				<th>Training</th>
				<th>Protein (grams)</th>
				<th>Protien Cals</th>
				<th id="header-carbs-cell">Carbs (grams)</th>
				<th>Carbs Cals</th>
				<th id="header-fats-cell">Fats (grams)</th>
				<th>Fats Cals</th>
			</tr>
			<tr id="0" class="row-day">
				<th>Monday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="1" class="row-day">
				<th>Tuesday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="2" class="row-day">
				<th>Wednesday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="3" class="row-day">
				<th>Thursday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="4" class="row-day">
				<th>Friday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="5" class="row-day">
				<th>Saturday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="6" class="row-day">
				<th>Sunday</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
		</table>
		<div class="top-space bottom-space">
			<p><span>Recommended Water (in Ltrs): </span><span id="recommended-water-in-lts"></span></p>
		</div>
	</div>
	
	<div id="send-via-email-container" class="bottom-space hidden-before-calculations">
		<label for="send-via-email-input">Enter an Email: </label>
		<input class="left-space centered-text-align" type="email" id="send-via-email-input" value="" placeholder="example@domain.com">
		<input id="send-via-email-button" type="button" value="Send">	
		<p id="thankYouBannerForm">The Results have been sent. Thank you!</p>
	</div>
</div>
<?php
get_footer();
?>