import { Component, EventEmitter } from 'angular2/core';
import { RestaurantComponent } from './restaurant.component';
import { Restaurant } from './restaurant.model';
import { EditRestaurantComponent } from './edit-restaurant.component';

@Component ({
  selector: 'restaurant-list',
  inputs: ['restaurantList'],
  outputs: ['onRestaurantSelect'],
  directives: [RestaurantComponent, EditRestaurantComponent],
  template: `
  <restaurant-display *ngFor="#currentRestaurant of restaurantList"
  (click)="restaurantClicked(currentRestaurant)"
  (click)="averageRating()"
  [restaurant]="currentRestaurant"
  [class.selected]="currentRestaurant === selectedRestaurant">
  </restaurant-display>
  <div *ngIf="selectedRestaurant">
    <h3> {{ selectedRestaurant.name }} </h3>
    <h4> {{selectedRestaurant.address}} </h4>
    <h4 class="rating"> Rating: {{ averageRating() }} </h4>
    <label>Restaurant Expense: {{ selectedRestaurant.expense }}</label>
  </div>
  <edit-restaurant *ngIf="selectedRestaurant" [restaurant]="selectedRestaurant">
  </edit-restaurant>
  <div class='ratingForm' *ngIf="selectedRestaurant">
  <label> Add Rating: </label>
    <select required  #newRating>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button (click)="addRating(newRating)" class="btn btn-lg">Add</button>
  </div>
  `
})

export class RestaurantListComponent {
  public restaurantList: Restaurant[];
  public onRestaurantSelect: EventEmitter<Restaurant>;
  public selectedRestaurant: Restaurant;
  public onRatingSubmit: EventEmitter<Number[]>;

  constructor(){
    this.onRestaurantSelect = new EventEmitter();
    this.onRatingSubmit = new EventEmitter();
  }
  restaurantClicked(clickedRestaurant: Restaurant): void {
    this.selectedRestaurant = clickedRestaurant;
    this.onRestaurantSelect.emit(clickedRestaurant);
  }
  addRating(userRating: HTMLSelectElement){
    var value = Number(userRating.value);
    var ratingArray = this.selectedRestaurant.rating;
    ratingArray.push(Number(value));
  }
  averageRating() {
    var defaultRating = 0;
    var ratingArray = [];
    for(var i = 0; i < this.selectedRestaurant.rating.length; i++){
      defaultRating = Number(defaultRating) + Number(this.selectedRestaurant.rating[i]);
      ratingArray.push(defaultRating);
    }
    var totalRating = ratingArray.pop();
    var averageRating = totalRating /  Number(this.selectedRestaurant.rating.length);
    return averageRating;
  }
}
