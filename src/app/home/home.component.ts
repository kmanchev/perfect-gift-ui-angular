import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../_models/user';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { MessageService } from '../_services/message.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  shouldShowEvents: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.shouldShowEvents = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  toggleShowEvents() {
    console.log("from toggle");
    if (this.shouldShowEvents) {
      console.log("hiding events");
      this.messageService.sendMessage('hide events');
      this.shouldShowEvents = false;
    } else {
      console.log("show events");
      this.messageService.sendMessage('show events');
      this.shouldShowEvents = true;
    }
    
  }

  createEvent = function () {
    console.log("create event")
    this.router.navigateByUrl('/createEvent');
};

}