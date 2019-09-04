import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//  import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';

import { District } from './district';

@Injectable()
export class districtService {
    //URL for CRUD operations
	districtUrl = "http://localhost:3001/districts";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	
	//Fetch all districts
    getAllDistricts(): Observable<District[]> {
	    // let xxy = this.http.get(this.districtUrl+"/get-district")
		// .pipe(map(this.extractData))
		// .pipe(catchError(this.handleError)); 
		// console.log(xxy)
		// console.log('REVIEW CONSOLE LOG'		)
		// return xxy;
		
		return this.http.get(this.districtUrl+"/get-district")
			.pipe(map(this.extractData))
			.pipe(catchError(this.handleError));  

    }
	//Create district
    createDistrict(district: District):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.districtUrl+"/create-district", district, options)
             .pipe(map(success => success.status))
            .pipe(catchError(this.handleError));
    }
	//Fetch district by id
    getDistrictById(districtId: number): Observable<District> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.districtUrl +"/get-district-by-id?id="+ districtId);
		return  this.http.get(this.districtUrl +"/get-district-by-id?id="+ districtId)
		   .pipe(map(this.extractData))
		   .pipe(catchError(this.handleError));
	}

	//Update district
    updateDistrict(district: District):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.districtUrl +"/update-district", district, options)
               .pipe(map(success => success.status))
               .pipe(catchError(this.handleError)); 
    }
    //Delete district	
	deleteDistrictById(districtId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.districtUrl +"/delete-district?id="+ districtId)
			   .pipe(map(success => success.status))
			   .pipe(catchError(this.handleError)); 
	}  // end deleteDistrictByID(...)
	countDistricts(){
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });

		let zzy2 = this.http.get(this.districtUrl +"/get-district-count")
		.pipe(map(success => success))
		.pipe(catchError(this.handleError)); 

		console.log('  countDISTRICTS - REVIEW CONSOLE LOG Upon return'		)
		console.log(zzy2)
		return zzy2;

	}	// end countDistricts()

    // Count schools withing a given district number
	countSchools(districtNum: string) {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	//	let options = new RequestOptions({ headers: cpHeaders });
		let zzy1 =this.http.get(this.districtUrl +"/get-school-count?distNum="+ districtNum)
			   .pipe(map(success => success))
			   .pipe(catchError(this.handleError)); 
		
		console.log('   COUNT SCHOOLS -- REVIEW CONSOLE LOG Upon return'		)
		console.log(zzy1)
		return zzy1;
	}  // end deleteDistrictByID(...)



	private extractData(res: Response) {
		let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}