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
  <restaurant-display *ngFor="#currentRestaurant of restaurantList" (click)="restaurantClicked(currentRestaurant)"
  [restaurant]="currentRestaurant"
  [class.selected]="currentRestaurant === selectedRestaurant">
  </restaurant-display>
  <div *ngIf="selectedRestaurant">
    <h3> {{ selectedRestaurant.name }} </h3>
    <h4> {{selectedRestaurant.address}} </h4>
    <h4 class="rating"> {{selectedRestaurant.rating}} </h4>
  </div>
  <edit-restaurant *ngIf="selectedRestaurant" [restaurant]="selectedRestaurant">
  </edit-restaurant>

  `
})

export class RestaurantListComponent {
  public restaurantList: Restaurant[];
  public onRestaurantSelect: EventEmitter<Restaurant>;
  public selectedRestaurant: Restaurant;

  constructor(){
    this.onRestaurantSelect = new EventEmitter();
  }
  restaurantClicked(clickedRestaurant: Restaurant): void {
    this.selectedRestaurant = clickedRestaurant;
    this.onRestaurantSelect.emit(clickedRestaurant);
  }
}
