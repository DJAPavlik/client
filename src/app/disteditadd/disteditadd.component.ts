import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { districtService } from '../district/district.service';
import { District } from '../district/district';
import { ActivatedRoute } from '@angular/router';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Location } from '@angular/common';

@Component({
  selector: 'app-disteditadd',
  templateUrl: './disteditadd.component.html',
  styleUrls: ['./disteditadd.component.css']
})
export class DisteditaddComponent implements OnInit {
   //Component properties
   allDistricts: District[];
   statusCode: number;
   requestProcessing = false;
   districtIdToUpdate = null;
   processValidation = false;
   //Create form
   districtForm = new FormGroup({

       name: new FormControl('', Validators.required),
       addr: new FormControl('', Validators.required),
       city: new FormControl('', Validators.required),	   
       status: new FormControl('', Validators.required),
       zip: new FormControl('', Validators.required),
       enr: new FormControl('', Validators.required),	
      distnum: new FormControl(' ', Validators.required),	
      id: new FormControl(' ', Validators.required)	



   });
   //Create constructor to get service instance
   constructor(
    private route: ActivatedRoute,
     private districtService: districtService,
     private location: Location
    ) {}

/*
  ngOnInit: void(
    //Load district by id to edit
    this.loadDistrictToEdit(districtId: string) {}


  ) {
  }  */
   //Create ngOnInit() and and load districts
   ngOnInit(): void {
    let distid:number = +this.route.snapshot.paramMap.get('distNum');
    
    console.log('  IN NGonINIT ---- distid')
    console.log(this.route.snapshot.paramMap)
    console.log(distid)
 //	alert('in the ngOnInit')
  //  this.getAllSchoolsInDistrict(aDistNum);
  if ( distid > 0 ) {
    console.log('branch ot loadDistricttoedit')
     this.loadDistrictToEdit(distid) 
     }  
  else {

  }

   }

//Handle create and update district
onDistrictFormSubmit() {
//alert('in onDistrictFormSubmit')
  
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
  //  alert(' in districtIdToUpdate === null')
    //Generate district id then create district
      this.districtService.getAllDistricts()
     .subscribe(districts => {
     
     //Generate district id	 
     let maxIndex = districts.length - 1;
     let districtWithMaxIndex = districts[maxIndex];

    



     let districtId = districtWithMaxIndex.id + 1;
     district.id = districtId;
     district.distnum = districtId;
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
      let distID =  district.id
      let JunkMsg = 'in Update District ' + distID
   //   alert(JunkMsg)
      
    this.districtService.updateDistrict(district)
      .subscribe(successCode => {
              this.statusCode = successCode;
         // this.getAllDistricts();	
          this.loadDistrictToEdit(distID) ;
        },
          errorCode => this.statusCode = errorCode);	  
  }
  
 }  // end onDistrictFormSubmit


//Load district by id to edit
loadDistrictToEdit(districtId: number) {
  this.preProcessConfigurations();
  this.districtService.getDistrictById(districtId)
    .subscribe(district => {
  console.log(district,'poiuytre');  
            this.districtIdToUpdate = district.id;   
      this.districtForm.setValue({ 
        name: district.name, 
        distnum: district.distnum,
        addr : district.addr,
        city :  district.city,
        status : district.status,
        zip : district.zip,
        enr : district.enr,
        id  : district.id
        
        
      });
      this.processValidation = true;
      this.requestProcessing = false;   
        },
        errorCode =>  this.statusCode = errorCode);   
} // end loadDisrictToEdit


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
 getAllDistricts() {
 // console.log('     in getAlldisctirct in district.component.ts')
 this.districtService.getAllDistricts()
   .subscribe(
             data => this.allDistricts = data,
     errorCode =>  this.statusCode = errorCode);  
     
}

backToDistRev(){
  this.location.back();
}


} // end disteditadd component
