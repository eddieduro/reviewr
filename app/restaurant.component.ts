import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component ({
  selector: 'restaurant-display',
  inputs: ['restaurant'],
  template: `
  <div>
    <ul>
      <h3>{{ restaurant.name }}</h3>
    </ul>
  </div>
  `
})

export class RestaurantComponent {
  public restaurant: Restaurant;
  setRating(newRating: number){
    this.restaurant.rating = newRating;
  }
}
