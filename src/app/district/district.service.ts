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
    getDistrictById(districtId: string): Observable<District> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.districtUrl +"/get-district-by-id?id="+ districtId);
		return this.http.get(this.districtUrl +"/get-district-by-id?id="+ districtId)
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
    }
	private extractData(res: Response) {
		let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}