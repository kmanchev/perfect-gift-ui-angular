import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { Event } from '../_models/event';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:4000/users/`);
    }

    getAllEvents() {
        return this.http.get<Event[]>(`http://localhost:4000/users/events`);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:4000/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`http://localhost:4000/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:4000/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:4000/users/${id}`);
    }

    deleteEvent(id: number) {
        return this.http.delete(`http://localhost:4000/users/deleteEvent/${id}`);
    }

    createEvent(body: String, headers) {
        return this.http.post(`http://localhost:4000/users/createEvent`, body, {headers});
    }

    inviteUserForEvent(body: String, headers) {
        return this.http.post(`http://localhost:4000/users/invite`, body, {headers});
    }
}