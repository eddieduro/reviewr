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
  <select (change)="onChange($event.target.value)">
    <option value=''>All</option>
    <option value='{{currentRestaurant.cuisine }}' *ngFor="#currentRestaurant of restaurantList">{{currentRestaurant.cuisine}}</option>
  </select>
  <restaurant-display *ngFor="#currentRestaurant of restaurantList | cuisine:filterCuisine"
  (click)="restaurantClicked(currentRestaurant)"
  (click)="averageRating()"
  [restaurant]="currentRestaurant"
  [class.selected]="currentRestaurant === selectedRestaurant">
  </restaurant-display>
  <div *ngIf="selectedRestaurant">
    <h3> {{ selectedRestaurant.name }} </h3>
    <h4> {{selectedRestaurant.address}} </h4>
    <h4 class="rating"> Rating: <span *ngFor="#star of starRating()"><i class='{{ star }}'></i></span><span>{{ averageRating() }}</span> </h4>
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
  public filterCuisine: Restaurant;

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
  starRating() {
    var defaultRating = 0;
    var ratingArray = [];
    var star = [];
    for(let i = 0; i < this.selectedRestaurant.rating.length; i++){
      defaultRating = Number(defaultRating) + Number(this.selectedRestaurant.rating[i]);
      ratingArray.push(defaultRating);
    }
    var totalRating = ratingArray.pop();
    var avgRating = totalRating /  Number(this.selectedRestaurant.rating.length);
    for( let i = 1; i < avgRating; i++ ){
      star.push('fa fa-star');
    }
    return star;
  }
  averageRating() {
    var defaultRating = 0;
    var ratingArray = [];
    for(let i = 0; i < this.selectedRestaurant.rating.length; i++){
      defaultRating = Number(defaultRating) + Number(this.selectedRestaurant.rating[i]);
      ratingArray.push(defaultRating);
    }
    console.log(ratingArray);
    var totalRating = ratingArray.pop();
    var avgRating = totalRating /  Number(this.selectedRestaurant.rating.length);
    var rating = avgRating.toFixed(2);
    return rating;
  }
  onChange(filterOption) {
    this.filterCuisine = filterOption;
    console.log(this.filterCuisine);
  }
}
