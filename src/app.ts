/* eslint-disable no-redeclare */

import { NoEmitOnErrorsPlugin } from 'webpack';
import  { Book, logger as DamageLogger, Person, Author, Librarian, logger, Magazine } from './intefaces';
import { Category } from './enum';
import { UniversityLibrarian, RefBook, Shelf } from './classes';
import { PersonBook } from './types';
import type { Library } from './classes';
import { purge } from './functions';


showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// 02. Types Basics
// Task 02.01. Basic Types
// Task 02.02. Const Assertions


const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3,
    pages: 200,
    markDamaged: (reason: string) => `Damaged: ${reason}`,
};

// printBook(myBook);
// console.log(myBook.markDamaged('missing back cover'));

// Task 04.02. Defining an Interface for Function Types

// const logDamage: logger /* DamageLogger */ = (reason: string) => `Damaged: ${reason}`;
// console.log(logDamage('missing back cover'));

// Task 04.03. Extending Interface
// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@gmail.com',
//     numBooksPublished: 3,
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Anna',
//     email: 'anna@gmail.com',
//     department: 'classical',
//     assistCustomer(custName) {
//         console.log(custName);
//     },
// };

// Task 04.04. Optional Chaining

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book.getTitle?.());
// console.log(offer.book.authors?.[0]);

// Task 04.05. Keyof Operator


// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// 05. Classes
// Task 05.01. Creating and Using Classes


// const ref: ReferenceItem = new ReferenceItem(12, 'TypeScript', 2021);
// ref.printItem();
// console.log(ref);
// ref.publisher = 'Publisher';
// console.log(ref.publisher);
// console.log (ref.getId());

// Task 05.02. Extending Classes

const refBook = new /* Encyclopedia */RefBook(1, 'Typescript', 2021, 3);
// console.log(refBook);
// console.log(refBook.printItem());

// Task 05.03. Creating Abstract Classes

// const refBook = new Encyclopedia(1, 'Typescript', 2021, 3);
// console.log(refBook);
// refBook.printCitation();

// Task 05.04. Interfaces for Class Types


const favoriteLibrarian: Librarian = new UniversityLibrarian();

favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris');

// Task 05.05. Intersection and Union Types

const personBook: PersonBook = {
    id: 1,
    name: 'Anna',
    email: 'anna@ex.com',
    author: 'Anna',
    available: false,
    title: 'TypeScripy',
    category: Category.CSS,
}

// 06. Modules and Namespaces
// Task 06.01. Using Namespaces

// Task 06.05. Dynamic Import Expression

import('./classes').then(module => {
    console.log(new module.Reader());
})

// Task 06.06. Type-Only Imports and Exports

// let lib: Library;
// lib = new Library();
// lib =  {
//     id: 5,
//     name: 'Anna',
//     address: 'Toronto'
// }

// 07. Generics
// Task 07.01. Generic Functions

const inventory: Book[] = [
    {
        id: 1,
        category: Category.JavaScript,
        title: 'Refactoring JavaScript',
        author: 'Evan Burchard',
        available: true,
    },
    { id: 2, category: Category.CSS, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
    { id: 3, category: Category.HTML, title: 'CSS Secrets', author: 'Lea Verou', available: true },
    {
        id: 4,
        category: Category.TypeScript,
        title: 'Mastering JavaScript Object-Oriented Programming',
        author: 'Andrea Chiarelli',
        available: true,
    },
]

// const result: Book[]  = purge<Book>(inventory);
// console.log(result);

// Task 07.02. Generic Interfaces and Classes
const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst());

const magazines: Magazine[]= [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
console.log(magazineShelf.getFirst())



