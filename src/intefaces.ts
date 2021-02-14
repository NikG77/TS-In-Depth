import { Category } from './enum';

interface DamageLogger {
  (reason: string): void;
}
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
  pages?: number;
  // markDamaged?: (reason: string) => void;
  markDamaged?: DamageLogger;
}

interface Person {
  name: string;
  email: string;
}
interface Author extends Person {
  numBooksPublished: number;
}
interface Librarian extends Person {
  department: string;
  assistCustomer: (custName: string) => void;
}

interface Magazine {
  title: string;
  publisher: string;
}

export {Book, DamageLogger as logger, Person, Author, Librarian, Magazine };