import * as Interfaces from "../intefaces";

export class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string): void {
      console.log(`${this.name} is assisting ${custName}`);
  }
}
