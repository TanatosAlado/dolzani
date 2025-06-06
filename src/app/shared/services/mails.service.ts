import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailsService {

  constructor(private http:HttpClient) { }

  sendMails(url:any,formData:any) {
    this.http.post(url, formData).subscribe(
      (response) => {
      },
      (error) => {
      }
    )
  }
}