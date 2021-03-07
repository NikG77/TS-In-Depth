import { logger, sealed, writable } from "../decorators";
import * as Interfaces from "../intefaces";

// @sealed('UniversityLibrarian')
// @logger

export class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string): void {
      console.log(`${this.name} is assisting ${custName}`);
  }

  // @writable(true)
  assistFaculty() {
    console.log('Assisting faculty')
  }

  // @writable(false)
  teachCommunity() {
    console.log('Teaching community')
  }

}


