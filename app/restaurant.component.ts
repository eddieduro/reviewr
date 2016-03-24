import { Component, EventEmitter } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component ({
  selector: 'restaurant-display',
  inputs: ['restaurant'],
  template: `
  <div class='contain'>
    <div class="item width_33 teaser">
      <div class="thumb_image block">
          <div class="image_container">
            <div class="image_overflow">
              <img class="img-responsive" alt="boxer">
            </div>
            <div class="image_container_wrapper">
              <div class="caption">
                <h3>{{ restaurant.name }}</h3>
                <h4 class="rating"> Rating:</h4>
                <span *ngFor="#star of starRating()"><i class='{{ star }}'></i></span>
                <span><h5>{{ averageRating() }}</h5></span>
                <label> Rate it: </label>
                  <select required  #newRating>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button (click)="addRating(newRating)" class="btn btn-lg">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    var totalRating = ratingArray.pop();
    var avgRating = totalRating /  Number(this.restaurant.rating.length);
    var rating = avgRating.toFixed(2);
    return rating;
  }
}
