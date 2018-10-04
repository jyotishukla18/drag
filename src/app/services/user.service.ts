import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import {User} from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
    user = [];
  constructor(private _http:Http) { }
  
  heroUrl = 'http://localhost/PHP/ang_php_api/single.php';

  checkMe:any;
  getUsers(){
      return this._http.get("http://localhost/PHP/ang_php_api/display.php")
      .pipe(map(
          (res: any) => {
        return res;
        }));
    }

    addSerUsers(info){
        return this._http.post("http://localhost/PHP/ang_php_api/insert.php",info)
        .pipe(map( () => '' ));
    }

    deleteSerUsers(id){
        return this._http.post("http://localhost/PHP/ang_php_api/delete.php/",{'id':id})
        .pipe(map( ()=>this.getUsers() ));
    }

    updateUser(info){
        console.log(info);
        return this._http.post("http://localhost/PHP/ang_php_api/edit.php/",info)
        .pipe(map( ()=>this.getUsers() ));
    }


    getUser(id):Observable<User>{

        return this._http.get("http://localhost/PHP/ang_php_api/single.php?id="+id)
        .pipe(map(
            (res: any) => {
          console.log('res', res);
          return res.json()|| {};
          }))
          
        ;
    }


}