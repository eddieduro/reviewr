import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'edit-restaurant',
  inputs: ['restaurant'],
  template: `
  <div class="restaurant-form container">
    <h3>Edit Restaurant: </h3>
    <div class="row">
      <label>Restaurant Name:</label>
      <input [(ngModel)]="restaurant.name" class="col-sm-4 input-lg task-form">
    </div>
    <div class="row">
      <label>Restaurant Address:</label>
      <input [(ngModel)]="restaurant.address" class="col-sm-4 input-lg task-form">
    </div>
    <label>Restaurant Expense:</label>
    <select (change)="priceUpdate($event.target.value)">
      <option value="$">$</option>
      <option value="$$">$$</option>
      <option value="$$$">$$$</option>
      <option value="$$$$">$$$$</option>
      <option value="$$$$$">$$$$$</option>
    </select>
  </div>
  `
})

export class EditRestaurantComponent {
  public restaurant: Restaurant;
  priceUpdate(newCost) {
    this.restaurant.expense = newCost;
  }
}
