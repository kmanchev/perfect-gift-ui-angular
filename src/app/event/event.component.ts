import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MessageService } from '../_services/message.service';
import { Event } from '../_models/event';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  events: Event[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {

      if (message) {
        if (message.text == "show events") {
          console.log("from constructor show events");
          this.loadAllUserEvents();
        }

        if (message.text == "hide events") {
          console.log("from constructor hide events");
          this.events = [];
        }

      } else {
        //nothing
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadAllUserEvents() {
    this.userService.getAllEvents().pipe(first()).subscribe(events => {
      this.events = events;
    });
  }

  private deleteEvent(id: number) {
    this.userService.deleteEvent(id).pipe(first()).subscribe(() => {
      this.loadAllUserEvents()
    });
  }

}
