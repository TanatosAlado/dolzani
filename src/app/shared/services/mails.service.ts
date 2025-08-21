import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailsService {

  constructor(private http:HttpClient) { }

  sendMails(url: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    return this.http.post(url, formData, { headers });
  }
}