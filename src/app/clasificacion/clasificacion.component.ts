import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {

  private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
    
  private equipos = [];

/*
  private addCatForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private age = new FormControl("", Validators.required);
  private weight = new FormControl("", Validators.required);
*/
  constructor(private http: Http,
              private dataService: DataService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEquipos();
    /*this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });*/
  }

  getEquipos() {
        this.postsSubscription = this.dataService.getEquipos().subscribe(
          data =>{ this.equipos = data;
          this.subscribeToEquipos();
                 });
    }
    
    private subscribeToEquipos(): void {
        this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.getEquipos());
    }
  

/*
  addCat() {
    this.dataService.addCat(this.addCatForm.value).subscribe(
      res => {
        var newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.toast.setMessage("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.dataService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this.dataService.deleteCat(cat).subscribe(
        res => {
          var pos = this.cats.map(cat => { return cat._id }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }
*/
}