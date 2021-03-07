import { Author, Book, Person } from "./intefaces";

type BookProperties = keyof Book;
type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;

export {BookProperties, PersonBook, BookOrUndefined};
export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type СreateCustomerFunctionType  = (name: string, age?: number, city?: string) => void;
