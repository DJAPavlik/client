import { Component, OnInit, Input } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-distsel',
  templateUrl: './distsel.component.html',
  styleUrls: ['./distsel.component.css']
})
export class DistselComponent implements OnInit {
  




  public selField: string ;
  public selOp:string ;

  public selVal:string ="123";
  public fullWhereClause: string ;

  public fieldData: Array<Select2OptionData>;
  public opData: Array<Select2OptionData>;


  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  

 


  ngOnInit(){
    this.fieldData = [
      {id: 'NAME'  ,text: 'Name'},
      {id: 'ADDR'  ,text: 'Address'},
      {id: 'CITY'  ,text: 'City'},
      {id: 'STATUS',text: 'State'},
      {id: 'ZIP'   ,text: 'Zip Code'},
      {id: 'ENR'   ,text: 'Enrollment'}
    ];

    this.opData = [
      { id: ' eq ', text: 'Equals'},
      { id: ' bw ', text: 'Begins With'},
      { id: ' ew ', text: 'Ends With' },
      { id: ' any ', text: 'Any Where in Field'}]
        
    

  }
  public chngField(e: any): void {
    this.selField = e.text;
    console.log(e);
    console.log(`check FIELD `)
    this.fullWhereClause = e.id + this.selOp + this.selVal 
  }

  public chngOp(e: any): void {
    this.selOp= e.text;
    console.log(e)
    console.log(`check  OP`)
    this.fullWhereClause = this.selField + e.id + this.selVal 
  }
  

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('save')
    console.log(this.selVal)
    this.fullWhereClause = this.selField + this.selOp + this.selVal;
  }
}  //  end DistselComponent