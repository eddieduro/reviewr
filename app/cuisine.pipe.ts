import { Pipe, PipeTransform } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Pipe ({
  name:'cuisine',
  pure: false
})

export class CuisinePipe implements PipeTransform {
  transform(input: Restaurant[], args){
    var desiredRestaurants = args[0];
    if(desiredRestaurants === "Asian"){
      return input.filter((restaurant) => {
        return restaurant.cuisine === "Asian";
      });
    } else if (desiredRestaurants === 'French') {
      return input.filter((restaurant) => {
        return restaurant.cuisine === "French";
      });
    } else if (desiredRestaurants === 'American') {
      return input.filter((restaurant) => {
        return restaurant.cuisine === "American";
      });
    } else {
      return input;
    }
  }
}
