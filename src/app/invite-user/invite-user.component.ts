import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.less']
})
export class InviteUserComponent implements OnInit {
  values = '';
  eventName= 'mother bday';

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }


  onKey(event: any) { // without type info
    this.values = event.target.value;
  }

   sendInvite = function() {
    this.userService.inviteUserForEvent().pipe(first()).subscribe(events => {
      console.log("invite sent");
    });
  }

}
