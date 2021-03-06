import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { districtService } from './district.service';
import { District } from './district';
import { schoolService } from '../school/school-svc.service'
import { stringify } from 'querystring';

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
   numDistricts :any;
   locDistrictId : any;
   locDistrictName : string;
   locDistrictNum : string;
   
   //Create form
   districtForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(
	   private districtService: districtService,
	  
	) {}
   
   //Create ngOnInit() and and load districts
   ngOnInit(): void {
		
	//	console.log('In ngOnInit in disrict.component.ts')
		 
	   this.getAllDistricts();
   }   
   //Fetch all districts

   getAllDistricts() {
	   console.log('     in getAlldisctirct in district.component.ts')
		this.districtService.getAllDistricts()
		  .subscribe(
                data => this.allDistricts = data,
				errorCode =>  this.statusCode = errorCode);  
				
   } // end getAllDistricts

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

			// console.log('     ---  JUNK in district.components.ts');
			// console.log(districts);
			// console.log( maxIndex);
			// console.log(districtWithMaxIndex);



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
   } // end onDistrictFormSubmit
  
/*   
   //Delete district
   xxxdeleteDistrict(districtId: string, distName: string) {
	if(confirm("Are you sure to delete school district "+distName+' - id = '+ districtId )) 
	{
		
      this.preProcessConfigurations();
      this.districtService.deleteDistrictById(districtId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllDistricts();	
				    this.backToCreateDistrict();
			    },
				errorCode => this.statusCode = errorCode); 
	}	   
   }  // end deleteDistrict    */
   

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


   getDistrictCount(retval){
	
	this.districtService.countDistricts()
	.subscribe(successCode => {
			  //this.statusCode = successCode;
			  console.log('in get Districtcount')
			  console.log(successCode)
			  var strxx : string = JSON.stringify(successCode)
			  strxx = strxx.trim()
			  var n = strxx.indexOf("numDistricts");
			  console.log(`check this ${n}`)
			  var x:string = `"numDistricts":`
			  var len = x.length;
			  console.log(`length is ${len}`)
			  n += len
			  strxx = strxx.slice(n)
			  console.log(`Check this ${strxx}`)
			  n = strxx.indexOf("}");
			  strxx = strxx.substr(0,n)
			  console.log(`Check this ${strxx}`)
			  this.numDistricts = `${strxx}`
			  retval = this.numDistricts
			  
		  },
		  errorCode => this.statusCode = errorCode); 
   }  // end getDistrictCount()

/*xxxDelete district
xxxdeleteDistrict(districtId: string, distName: string) {
	this.locDistrictId = districtId
	this.locDistrictName = distName
	this.districtService.countDistricts()
	.subscribe(successCode => {
			  //this.statusCode = successCode;
			  console.log('in get Districtcount')
			  console.log(successCode)
			  var strxx : string = JSON.stringify(successCode)
			  strxx = strxx.trim()
			  var n = strxx.indexOf("numDistricts");
			  console.log(`check this ${n}`)
			  var x:string = `"numDistricts":`
			  var len = x.length;
			  console.log(`length is ${len}`)
			  n += len
			  strxx = strxx.slice(n)
			  console.log(`Check this ${strxx}`)
			  n = strxx.indexOf("}");
			  strxx = strxx.substr(0,n)
			  console.log(`Check this ${strxx}`)
			  this.numDistricts = `${strxx}`
				this.Want2Delete()
		  },	  // error on count
		  errorCode => this.statusCode = errorCode);  

 
   }  // end deleteDistrict  xxx*/
// *xxxDelete district
deleteDistrict(districtId: string, distName: string, districtNum:string) {
	this.locDistrictId = districtId
	this.locDistrictName = distName
	this.locDistrictNum = districtNum
	this.districtService.countSchools(this.locDistrictNum)
	.subscribe(successCode => {
			  //this.statusCode = successCode;
			  console.log('in get Districtcount')
			  console.log(successCode)
			  console.log('   After successCode')
			  var strxx : string = JSON.stringify(successCode)
			  strxx = strxx.trim()
			  var n = strxx.indexOf("numSchools");
			  console.log( `strxxx->${strxx}<--`)
			  console.log(`check this ${n}`)
			  var x:string = `"numSchools":`
			  var len = x.length;
			  console.log(`length is ${len}`)
			  n += len
			  strxx = strxx.slice(n)
			  console.log(`Check this ${strxx}`)
			  n = strxx.indexOf("}");
			  strxx = strxx.substr(0,n)
			  console.log(`Check this ${strxx}`)
			  this.numDistricts = `${strxx}`
				this.Want2Delete()
		  },	  // error on count
		  errorCode => this.statusCode = errorCode);  

 
   }  // end deleteDistrict 




Want2Delete(){
// if there are schools in disrict - cannot delete
if (this.numDistricts == 0 )
{
   if(confirm("Num Schools = "+ this.numDistricts + 
   " Are you sure to delete school district "+this.locDistrictId+' - id = '+ this.locDistrictName ))
   {
   
 this.preProcessConfigurations();
 this.districtService.deleteDistrictById(this.locDistrictId)
	 .subscribe(successCode => {
			   //this.statusCode = successCode;
			   //Expecting success code 204 from server
			   this.statusCode = 204;
			   this.getAllDistricts();	
			   this.backToCreateDistrict();
		   },
		   errorCode => this.statusCode = errorCode); 
   }	 // end confirm
} // end else
else
{
	alert("District " + this.locDistrictName + " has " + this.numDistricts + " schools - CANNOT DELETE")
}



} // end Want2Delete?
}	// end district.component
    




