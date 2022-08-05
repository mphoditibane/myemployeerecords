import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val: { firstName: string; lastName: string; contactNumber: string})=>{
      let rVal=(val.firstName.toLocaleLowerCase().includes(args)) || val.firstName.toLocaleUpperCase().includes(args)
      || (val.lastName.toLocaleLowerCase().includes(args) ||(val.lastName.toLocaleUpperCase().includes(args)) || (val.contactNumber.toLocaleLowerCase().includes(args) ||(val.contactNumber.toLocaleUpperCase().includes(args))));
      return rVal;
    })
    
  }

}