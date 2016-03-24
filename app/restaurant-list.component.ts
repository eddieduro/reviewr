import { Component, EventEmitter } from 'angular2/core';
import { RestaurantComponent } from './restaurant.component';
import { Restaurant } from './restaurant.model';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { CuisinePipe } from './cuisine.pipe';

@Component ({
  selector: 'restaurant-list',
  inputs: ['restaurantList'],
  outputs: ['onRestaurantSelect'],
  pipes: [CuisinePipe],
  directives: [RestaurantComponent, EditRestaurantComponent],
  template: `
  <div class='container'>
    <select (change)="onCuisineChange($event.target.value)">
      <option value=''>All</option>
      <option value='{{currentRestaurant.cuisine }}' *ngFor="#currentRestaurant of restaurantList">{{currentRestaurant.cuisine}}</option>
    </select>
  </div>
  <restaurant-display *ngFor="#currentRestaurant of restaurantList | cuisine:filterCuisine"
  (click)="restaurantClicked(currentRestaurant)"
  (click)="averageRating()"
  [restaurant]="currentRestaurant"
  [class.selected]="currentRestaurant === selectedRestaurant">
  </restaurant-display>
  <div class='container' *ngIf="selectedRestaurant">
    <h3> {{ selectedRestaurant.name }} </h3>
    <h4> {{selectedRestaurant.address}} </h4>
    <label>Restaurant Expense: {{ selectedRestaurant.expense }}</label>
  </div>
  <edit-restaurant *ngIf="selectedRestaurant" [restaurant]="selectedRestaurant">
  </edit-restaurant>

  `
})

export class RestaurantListComponent {
  public restaurantList: Restaurant[];
  public onRestaurantSelect: EventEmitter<Restaurant>;
  public selectedRestaurant: Restaurant;
  public onRatingSubmit: EventEmitter<Number[]>;
  public filterCuisine: Restaurant;

  constructor(){
    this.onRestaurantSelect = new EventEmitter();
    this.onRatingSubmit = new EventEmitter();
  }
  restaurantClicked(clickedRestaurant: Restaurant): void {
    this.selectedRestaurant = clickedRestaurant;
    this.onRestaurantSelect.emit(clickedRestaurant);
  }

  onCuisineChange(filterOption) {
    this.filterCuisine = filterOption;
  }
}
