export interface listRoom{

    id: string,
    type: number,
    pricePerNight:number,
    amenities: Amenities
  }
 
  export interface Amenities {
  
      id: string,
      $values: []
   
  }