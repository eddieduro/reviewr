import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'edit-restaurant',
  inputs: ['restaurant'],
  template: `
  <div class="restaurant-form form container">
    <h3>Edit Restaurant: </h3>
    <div class="row">
      <label for='name'>Restaurant Name:</label>
      <label for="name">
        <input type="text" name="name" [(ngModel)]="restaurant.name" placeholder="{{ restaurant.name }}">
        <span>{{ restaurant.name }}</span>
      </label>
    </div>
    <div class="row">
    <label for='name'>Restaurant Address:</label>
    <label for="name">
      <input type="text" name="address" [(ngModel)]="restaurant.address" placeholder="{{ restaurant.address }}">
      <span>{{ restaurant.address }}</span>
    </label>
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
