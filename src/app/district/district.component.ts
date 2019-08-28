import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { districtService } from './district.service';
import { District } from './district';

@Component({
   selector: 'app-district',
   templateUrl: './district.component.html',
   styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit { 
   //Component properties
   allDistricts: District[];
   statusCode: number;
   requestProcessing = false;
   districtIdToUpdate = null;
   processValidation = false;
   //Create form
   districtForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private districtService: districtService) {
   }
   //Create ngOnInit() and and load districts
   ngOnInit(): void {

		console.log('In ngOnInit in disrict.component.ts')

	   this.getAllDistricts();
   }   
   //Fetch all districts

   getAllDistricts() {
	   console.log('     in getAlldisctirct in district.component.ts')
		this.districtService.getAllDistricts()
		  .subscribe(
                data => this.allDistricts = data,
				errorCode =>  this.statusCode = errorCode);  
				
   }
   //Handle create and update district
   onDistrictFormSubmit() {

		console.log('     in onDistrictformSubmit')
	  this.processValidation = true;   
	  	console.log(this.processValidation)
	  if (this.districtForm.invalid) {
		  	console.log('     invalid form')
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let district = this.districtForm.value;
	  if (this.districtIdToUpdate === null) {  
	    //Generate district id then create district
        this.districtService.getAllDistricts()
	     .subscribe(districts => {
			 
		   //Generate district id	 
		   let maxIndex = districts.length - 1;
		   let districtWithMaxIndex = districts[maxIndex];

			console.log('     ---  JUNK in district.components.ts');
			console.log(districts);
			console.log( maxIndex);
			console.log(districtWithMaxIndex);



		   let districtId = districtWithMaxIndex.id + 1;
		   district.id = districtId;
		   console.log(district,'this is form data---');
		   //Create district
     	   this.districtService.createDistrict(district)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllDistricts();	
					this.backToCreateDistrict();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update district
        district.id = this.districtIdToUpdate; 		
	    this.districtService.updateDistrict(district)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllDistricts();	
					this.backToCreateDistrict();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load district by id to edit
   loadDistrictToEdit(districtId: string) {
      this.preProcessConfigurations();
      this.districtService.getDistrictById(districtId)
	      .subscribe(district => {
			console.log(district,'poiuytre');  
		            this.districtIdToUpdate = district.id;   
					this.districtForm.setValue({ title: district.name, category: district.addr });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }

   //Delete district
   deleteDistrict(districtId: string) {
	   alert( 'stubbed out right now')
/*      this.preProcessConfigurations();
      this.districtService.deleteDistrictById(districtId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllDistricts();	
				    this.backToCreateDistrict();
			    },
		        errorCode => this.statusCode = errorCode);    */
   }  // end deleteDistrict
   // display all the schools in a given district (i.e. having same distnum)
	displaySchoolsInDistrict( distNum : string) {
		alert("display schools in district number " )
		this.getAllDistricts();	
		this.backToCreateDistrict();
	}	// end displaySchoolsInDistrict


   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }   // end preProcessConfimation
   //Go back from update to create
   backToCreateDistrict() {
      this.districtIdToUpdate = null;
      this.districtForm.reset();	  
	  this.processValidation = false;
   }
}
    




