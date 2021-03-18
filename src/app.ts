/* eslint-disable no-redeclare */

import { NoEmitOnErrorsPlugin } from 'webpack';
import { Book, logger as DamageLogger, Person, Author, Librarian, logger, Magazine } from './intefaces';
import { Category } from './enum';
import { UniversityLibrarian, RefBook, Shelf } from './classes';
import { BookRequiredFields, PersonBook, UpdatedBook, СreateCustomerFunctionType } from './types';
import type { Library } from './classes';
import {
    getProperty,
    purge,
    createCustomer,
    getBooksByCategory,
    getBookTitlesByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    getTitles,
    logSearchResults,
} from './functions';

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

const refBook = new /* Encyclopedia */ RefBook(1, 'Typescript', 2021, 3);
// console.log(refBook);
// console.log(refBook.printItem());

// Task 05.03. Creating Abstract Classes

// const refBook = new Encyclopedia(1, 'Typescript', 2021, 3);
// console.log(refBook);
// refBook.printCitation();

// Task 05.04. Interfaces for Class Types

const favoriteLibrarian: Librarian = new UniversityLibrarian();

// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris');

// Task 05.05. Intersection and Union Types

const personBook: PersonBook = {
    id: 1,
    name: 'Anna',
    email: 'anna@ex.com',
    author: 'Anna',
    available: false,
    title: 'TypeScripy',
    category: Category.CSS,
};

// 06. Modules and Namespaces
// Task 06.01. Using Namespaces

// Task 06.05. Dynamic Import Expression

// import('./classes').then(module => {
//     console.log(new module.Reader());
// });

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
];

// const result: Book[]  = purge<Book>(inventory);
// console.log(result);

// Task 07.02. Generic Interfaces and Classes

// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// // console.log(bookShelf.getFirst());

// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' },
// ];

// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach(mag => magazineShelf.add(mag));
// console.log(magazineShelf.getFirst());

// Task 07.03. Generic Constraints
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));
// console.log(getProperty(magazines[0], 'title'));

// Task 07.04. Utility Types
// const book: BookRequiredFields = {
//     author: 'Anna',
//     id: 1,
//     title: 'Unknown',
//     available: false,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: null,
// };

// const B: UpdatedBook = {
//     id: 1,
//     }

// const params: Parameters<СreateCustomerFunctionType> = ['Anna'];
// createCustomer(...params);

// 08. Decorators
// Task 08.01. Class Decorators (sealed)
// const l = new UniversityLibrarian();
// console.log(l);

// Task 08.02. Class Decorators that replace constructor functions (logger)
// const l = new UniversityLibrarian();
// l.name ='Anna'
// console.log(l);
// l['printLibrarian']();

// Task 08.03. Method Decorator (writable)
// const l = new UniversityLibrarian();
// l.assistFaculty = null;
// // l.teachCommunity = null;
// console.log(l);

// Task 08.04. Method Decorator (timeout)
// const e = new RefBook(1, 'Unknonw', 2021, 2);
// e.printItem();

// Task 08.05. Parameter Decorator (logParameter)

// const l = new UniversityLibrarian();
// l.name = 'Anna';
// l.assistCustomer('Boris');
// console.log(l);

// Task 08.06. Property Decorator
// const l = new UniversityLibrarian();
// l.name = 'Anna';
// console.log(l.name)
// l.assistCustomer('Boris');
// console.log(l);

// Task 08.07. Accessor Decorator

const e = new RefBook(1, 'Unknonw', 2021, 2);
e.copies = 10;
// e.copies = 0;
// e.copies = 1.1;

// 09. Asynchronous Patterns
// Task 09.01. Callback Functions

// console.log('start');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// // getBooksByCategory(Category.Software, logCategorySearch);
// console.log('finish');

// Task 09.02. Promises

// console.log('start');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log(titles);
//         return titles.length;
//     })
//     .then(numOfBook => console.log(numOfBook))
//     .catch(err => console.log(err));
// // getBooksByCategoryPromise(Category.Software)
// //     .then(titles => console.log(titles))
// //     .catch(err => console.log(err));
// console.log('finish');

// Task 09.03. Async Functions

// console.log('start');

// logSearchResults(Category.JavaScript);
// logSearchResults(Category.Software).catch(err => console.log(err));

// console.log('finish');

// TASK1

// Вывести массив объектов с заданным значением возраста от максимального (1 - самый старший, 2 - второй по страришинству и т.д)
interface Children {
    id: string;
    age: number;
    firstName: string;
}

const children: Children[] = [
    { id: '1', age: 15, firstName: 'Donny' },
    { id: '2', age: 14, firstName: 'Many' },
    { id: '3', age: 15, firstName: 'Tony' },
    { id: '4', age: 16, firstName: 'Donny' },
    { id: '5', age: 16, firstName: 'Peter' },
    { id: '6', age: 10, firstName: 'Anna' },
];

const findOlderChildren = (value: number): Children[] => {
    children.sort((a, b) => b.age - a.age);
    const sortedSetOfAges = Array.from(new Set(children.map(child => child.age)));

    return children.filter(child => sortedSetOfAges[value - 1] === child.age);
};

console.log(findOlderChildren(1));

// TASK 2
// Получить на основе входящего массива массив с рандомным кол-вом элементов в диапазоне от min до max, не изменяя входной массив
const writers: String[] = [
    `Brad Bird`,
    `Robert Rodrigues`,
    `Takeshi Kitano`,
    `Hayao Miazaki`,
    `Robert Zemeckis`,
    `Martin Scorsese`,
    `Quentin Tarantino`,
    `Stephen King`,
];

function getRandomArray(arr: String[], min: number, max: number): String[] {
    const numberRandom = getRandomIntegerNumber(min, max);
    const arrClon = arr.slice();
    const arrNew: String[] = [];
    let numberArrRandom: number;

    for (let i = 0; i < numberRandom; i++) {
        numberArrRandom = getRandomIntegerNumber(0, arrClon.length - 1);
        arrNew.push(arrClon[numberArrRandom]);
        arrClon.splice(numberArrRandom, 1);
    }
    return arrNew;
}

function getRandomIntegerNumber(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min));
}

console.log(getRandomArray(writers, 2, 5));
