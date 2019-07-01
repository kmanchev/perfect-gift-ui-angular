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
    this.currentUserSubscription.unsubscribe();
  }

  toggleShowEvents() {
    if (this.shouldShowEvents) {
      this.messageService.sendMessage('hide events');
      this.shouldShowEvents = false;
    } else {
      this.messageService.sendMessage('show events');
      this.shouldShowEvents = true;
    }
    
  }

  createEvent = function () {
    this.router.navigateByUrl('/createEvent');
};

}