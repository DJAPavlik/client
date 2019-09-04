import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//  import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';

import { School } from './school';

@Injectable()
export class schoolService {
    //URL for CRUD operations
	schoolUrl = "http://localhost:3001/schools";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	
	//Fetch all schools
    getAllSchools(): Observable<School[]> {
		return this.http.get(this.schoolUrl+"/get-school")
			.pipe(map(this.extractData))
			.pipe(catchError(this.handleError)); 

	}
		// get all schools within a given district number
		getSchoolByDistnum(distnum: string): Observable<School[]> {
			let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: cpHeaders });
			console.log(this.schoolUrl +"/get-school-by-distnum?distnum="+ distnum);
			return this.http.get(this.schoolUrl +"/get-school-by-distnum?distnum="+ distnum)
				   .pipe(map(this.extractData))
				   .pipe(catchError(this.handleError)); 
		}	




	//Create school
    createSchool(school: School):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.schoolUrl+"/create-school", school, options)
             .pipe(map(success => success.status))
            .pipe(catchError(this.handleError));
    }
	//Fetch school by id
    getSchoolById(schoolId: string): Observable<School> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.schoolUrl +"/get-school-by-id?id="+ schoolId);
		return this.http.get(this.schoolUrl +"/get-school-by-id?id="+ schoolId)
			   .pipe(map(this.extractData))
			   .pipe(catchError(this.handleError)); 
    }	
	//Update school
    updateSchool(school: School):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.schoolUrl +"/update-school", school, options)
               .pipe(map(success => success.status))
               .pipe(catchError(this.handleError)); 
    }
    //Delete school	
	deleteSchoolById(schoolId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.schoolUrl +"/delete-school?id="+ schoolId)
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
