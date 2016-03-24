import { Component } from 'angular2/core';
import { RestaurantListComponent } from './restaurant-list.component';
import { Restaurant } from './restaurant.model';



@Component({
  selector: 'my-app',
  directives: [RestaurantListComponent],
  template: `
  <div class="container-fluid">
  	<h1>Reviewr</h1>
    <restaurant-list
    [restaurantList]="restaurants"
    (onRestaurantSelect)="restaurantWasSelected($event)"
    (onRatingSubmit)="ratingAverage($event)">
    </restaurant-list>
  <div>
  `
})
export class AppComponent {
  public restaurants: Restaurant[];
  constructor(){
    this.restaurants = [
      new Restaurant("Boxer Ramer", "Asian", "1234 Example st", '$$', [0], 0),
      new Restaurant("Le Pigeon", "French", "231 Fake st", '$$$$', [0] , 1),
      new Restaurant("Piazza Italia", "Italian", "1232 Marshall st", '$$$', [0], 2)
    ];
  }
  restaurantWasSelected(clickedRestaurant: Restaurant): void {
    console.log(clickedRestaurant);
  }
}
