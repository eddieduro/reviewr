import { Component } from 'angular2/core';
import { RestaurantListComponent } from './restaurant-list.component';
import { Restaurant } from './restaurant.model';



@Component({
  selector: 'my-app',
  directives: [RestaurantListComponent],
  template: `
  <div class="container">
  	<h1 class='text-center'>Reviewr</h1>
  </div>
    <restaurant-list
    [restaurantList]="restaurants"
    (onRestaurantSelect)="restaurantWasSelected($event)"
    (onRatingSubmit)="ratingAverage($event)">
    </restaurant-list>

  `
})
export class AppComponent {
  public restaurants: Restaurant[];
  constructor(){
    this.restaurants = [
      new Restaurant("Boxer Ramen", "Asian", "1234 Example st", '$$', [0], 0),
      new Restaurant("Le Pigeon", "French", "231 Fake st", '$$$$', [0] , 1),
      new Restaurant("Lardo", "American", "1232 Marshall st", '$', [0], 2)
    ];
  }
  restaurantWasSelected(clickedRestaurant: Restaurant): void {
    console.log(clickedRestaurant);
  }
}
