import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'edit-restaurant',
  inputs: ['restaurant'],
  template: `
  <div class="restaurant-form">
    <h3>Edit Restaurant: </h3>
    <label>Restaurant Name:</label>
    <input [(ngModel)]="restaurant.name" class="col-sm-8 input-lg task-form">
    <label>Restaurant Address:</label>
    <input [(ngModel)]="restaurant.address" class="col-sm-8 input-lg task-form">
    <label>Restaurant Expense:</label>
    <select (change)="onChange($event.target.value)">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
  `
})

export class EditRestaurantComponent {
  public restaurant: Restaurant;
  onChange(newCost) {
    this.restaurant.expense = newCost;
  }
  updatingRating(newRating) {
    this.restaurant.rating = newRating;
  }
}
