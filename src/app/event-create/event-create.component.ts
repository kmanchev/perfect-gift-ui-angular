import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service'
import { AlertService } from '../_services/alert.services';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.less']
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required]
    });

    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventForm.invalid) {
      console.log("are invalid ?");
      return;
    }

    this.loading = true;

    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    this.userService.createEvent(JSON.stringify({
      eventName: this.f.eventName.value,
      eventType: this.f.eventType.value
    }), headers)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log("from error??");
          this.alertService.error(error);
          this.loading = false;
        });
    this.loading = false;
  }

}
