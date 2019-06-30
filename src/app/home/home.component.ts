import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { Event } from '../_models/event';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentEvent: Event;
  currentUserSubscription: Subscription;
  users: User[] = [];
  events: Event[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUserEvents();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  //TODO: To remove
  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  //TODO: To implement
  deleteEvent(id: number) {
    this.userService.deleteEvent(id).pipe(first()).subscribe(() => {
      this.loadAllUserEvents()
    });
  }


  //TODO: To remove 
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  //TODO: To implement
  private loadAllUserEvents() {
    this.userService.getAllEvents().pipe(first()).subscribe(events => {
      this.events = events;
    });
  }

}