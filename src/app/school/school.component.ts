import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { schoolService } from './school-svc.service';
import { School } from './school';
import { Location } from '@angular/common';


@Component({
   selector: 'app-school',
   templateUrl: './school.component.html',
   styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit { 
	@Input() school: School;
	
   //Component properties
   allSchools: School[];
   allSchInDist: School[]
   statusCode: number;
   requestProcessing = false;
   schoolIdToUpdate = null;
   processValidation = false;
   //Create form
   schoolForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });


   constructor(
    private route: ActivatedRoute,
    private schoolService: schoolService,
    private location: Location
  ) {}

   //Create ngOnInit() and and load schools
   ngOnInit(): void {
	console.log( '    --- in SchoolComponent')
	let distNum:number = +this.route.snapshot.paramMap.get('distNum');
	let aDistNum : string = distNum.toString()

	console.log(distNum)
//	alert('in the ngOnInit')
	this.getAllSchoolsInDistrict(aDistNum);
   }   
   //Fetch all schools

   getAllSchools( ) {
	   console.log('     in getAlldisctirct in school.component.ts')
		this.schoolService.getAllSchools()
		  .subscribe(
                data => this.allSchools = data,
				errorCode =>  this.statusCode = errorCode);  
				
   }
   getAllSchoolsInDistrict(distNum:string) {
	console.log('  zzz   in getAlldisctirct')
//	alert('in Get All Schools Be District')
	 this.schoolService.getSchoolByDistnum(distNum)
	   .subscribe(
			 data => this.allSchools = data,
			 errorCode =>  this.statusCode = errorCode);  
			 
}
	


   //Handle create and update school
   onSchoolFormSubmit() {

		console.log('     in onSchoolformSubmit')
	  this.processValidation = true;   
	  	console.log(this.processValidation)
	  if (this.schoolForm.invalid) {
		  	console.log('     invalid form')
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let school = this.schoolForm.value;
	  if (this.schoolIdToUpdate === null) {  
	    //Generate school id then create school
        this.schoolService.getAllSchools()
	     .subscribe(schools => {
			 
		   //Generate school id	 
		   let maxIndex = schools.length - 1;
		   let schoolWithMaxIndex = schools[maxIndex];

			console.log('     ---  JUNK in school.components.ts');
			console.log(schools);
			console.log( maxIndex);
			console.log(schoolWithMaxIndex);



		   let schoolId = schoolWithMaxIndex.id + 1;
		   school.id = schoolId;
		   console.log(school,'this is form data---');
		   //Create school
     	   this.schoolService.createSchool(school)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllSchools();	
					this.backToCreateSchool();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update school
        school.id = this.schoolIdToUpdate; 		
	    this.schoolService.updateSchool(school)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllSchools();	
					this.backToCreateSchool();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load school by id to edit
   loadSchoolToEdit(schoolId: string) {
	alert( 'edit school stub')
    //     this.preProcessConfigurations();
    //   this.schoolService.getSchoolById(schoolId)
	//       .subscribe(school => {
	// 		console.log(school,'poiuytre');  
	// 	            this.schoolIdToUpdate = school.id;   
	// 				this.schoolForm.setValue({ title: school.name, category: school.addr });
	// 				this.processValidation = true;
	// 				this.requestProcessing = false;   
	// 	        },
	// 	        errorCode =>  this.statusCode = errorCode);   
   }

   //Delete school
   deleteSchool(schoolId: string) {
	   alert( 'delete school stub')
/*      this.preProcessConfigurations();
      this.schoolService.deleteSchoolById(schoolId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllSchools();	
				    this.backToCreateSchool();
			    },
		        errorCode => this.statusCode = errorCode);    */
   }  // end deleteSchool
   addSchool()	{
	alert(
		'add school stub'
	)
}	


   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }   // end preProcessConfimation
   //Go back from update to create
   backToCreateSchool() {
      this.schoolIdToUpdate = null;
      this.schoolForm.reset();	  
	  this.processValidation = false;
   }

  goBack(): void {
    this.location.back();
  }
}
