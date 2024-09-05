import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {

  transform(rating: number): { full: number[], half: boolean, empty: number[], rate: string } {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars > 0.2;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const formattedrate = rating.toFixed(1);
    return {
      full: Array(fullStars).fill(0),
      half: halfStar,
      empty: Array(emptyStars).fill(0),
      rate: formattedrate
    };
  }

}
