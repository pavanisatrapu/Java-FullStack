import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { State } from '../common/state';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private countriesUrl='http://localhost:8080/countries';
  private statesUrl='http://localhost:8080/states';
  
  constructor(private httpClient:HttpClient) { }

  getCountries() :Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(reponse=>reponse._embedded.countries)
    );
  }
  getStates(countyCode:string):Observable<State[]>{
    const searchStateUrl=`${this.statesUrl}/search/findByCountryCode?code=${countyCode}`;
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(reposponse=>reposponse._embedded.states)
    )
  }
}

interface GetResponseCountries{
  _embedded:{
    countries:Country[]
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[]
  }
}
