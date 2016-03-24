import { Component, EventEmitter } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component ({
  selector: 'restaurant-display',
  inputs: ['restaurant'],
  template: `
  <div>
    <ul>
      <h3>{{ restaurant.name }}</h3>
      <h4 class="rating"> Rating: <span *ngFor="#star of starRating()"><i class='{{ star }}'></i></span><span>{{ averageRating() }}</span> </h4>
      <label> Rate it: </label>
        <select required  #newRating>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button (click)="addRating(newRating)" class="btn btn-lg">Add</button>
    </ul>
  </div>
  `
})

export class RestaurantComponent {
  public restaurant: Restaurant;
  public onRatingSubmit: EventEmitter<Number[]>;

  addRating(userRating: HTMLSelectElement){
    var value = Number(userRating.value);
    var ratingArray = this.restaurant.rating;
    ratingArray.push(Number(value));
  }
  starRating() {
    var defaultRating = 0;
    var ratingArray = [];
    var star = [];
    for(let i = 0; i < this.restaurant.rating.length; i++){
      defaultRating = Number(defaultRating) + Number(this.restaurant.rating[i]);
      ratingArray.push(defaultRating);
    }
    var totalRating = ratingArray.pop();
    var avgRating = totalRating /  Number(this.restaurant.rating.length);
    for( let i = 1; i < avgRating; i++ ){
      star.push('fa fa-star');
    }
    return star;
  }
  averageRating() {
    var defaultRating = 0;
    var ratingArray = [];
    for(let i = 0; i < this.restaurant.rating.length; i++){
      defaultRating = Number(defaultRating) + Number(this.restaurant.rating[i]);
      ratingArray.push(defaultRating);
    }
    console.log(ratingArray);
    var totalRating = ratingArray.pop();
    var avgRating = totalRating /  Number(this.restaurant.rating.length);
    var rating = avgRating.toFixed(2);
    return rating;
  }
}
