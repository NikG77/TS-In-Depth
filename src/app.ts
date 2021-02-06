/* eslint-disable no-redeclare */

// showHello('greeting', 'TypeScript');

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = `Hello from ${name}`;
// }

// 02. Types Basics
// Task 02.01. Basic Types
// Task 02.02. Const Assertions

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

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
type BookProperties = keyof Book;

function getAllBooks(): ReadonlyArray<Book> {
    const books: readonly Book[] = <const>[
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

    return books;
}

function logFirstAvailable(books: readonly any[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);
    const book = books.find((book: { available: boolean }) => book.available);
    console.log(`Name of first available book ${book.title}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    const books = getAllBooks();
    return books
        .filter((book: { category: Category }) => book.category === category)
        .map((book: { title: string }) => book.title);
}

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

function getBookAuthorByIndex(index: number): [string, string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
}

// console.log(getAllBooks());

// logFirstAvailable(getAllBooks());

// logBookTitles(getBookTitlesByCategory(Category.CSS));

// console.log(getBookAuthorByIndex(1));

// console.log(calcTotalPages());

// 03. Functions
// Task 03.01. Function Type

// function createCustomerID(name: string, id: number): string {
//     return `${id}-${name}`;
// }

// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number) => `${id}-${name}`;
// idGenerator = createCustomerID;
// console.log(idGenerator('Boris', 20));

// Task 03.02. Optional, Default and Rest Parameters

function createCustomerID(name: string, age?: number, city?: string): void {
    console.log(`Creating customer name ${name}`);
    if (age) {
        console.log(`Creating customer age ${age}`);
    }
    if (city) {
        console.log(`Creating customer city ${city}`);
    }
}

function getBookByID(id: number): Book | undefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

// function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
//     console.log(`Customer Name ${customer}`);

//     const titles: string[] = [];

//     bookIDs.forEach(id => {
//         const book = getBookByID(id);
//         if (book?.available) {
//             titles.push(book.title);
//         }
//     });
//     return titles;
// }
// createCustomerID('Anna');
// createCustomerID('Anna', 30);
// createCustomerID('Anna', 30, 'Kyiv');

// console.log(getBookTitlesByCategory());
// logFirstAvailable();

// console.log(getBookByID(1));

// const myBooks = сheckoutBooks('Ann', ...[1, 2, 4]);
// console.log(myBooks);

// Task 03.03. Function Overloading

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]) {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        }

        if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }
}

// const checkedOutBooks = getTitles(1, true);
// console.log(checkedOutBooks);

// Task 03.04. Assertion Functions
// если два типа то можно использовать
function assertStringAndNumberValue(val: any): asserts val is string | number {
    if (typeof val !== 'string' && typeof val !== 'number') {
        throw new Error('value should have been a string or number');
    }
}

function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

// console.log(bookTitleTransform('строка'));
// console.log(bookTitleTransform(1));

// 04. Interfaces
// Task 04.01. Defining an Interface

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

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

const logDamage: DamageLogger = (reason: string) => `Damaged: ${reason}`;
// console.log(logDamage('missing back cover'));

// Task 04.03. Extending Interface
const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@gmail.com',
    numBooksPublished: 3,
};

const favoriteLibrarian: Librarian = {
    name: 'Anna',
    email: 'anna@gmail.com',
    department: 'classical',
    assistCustomer(custName) {
        console.log(custName);
    },
};


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

function getProperty(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }
    return book[prop];
}
// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// 05. Classes
// Task 05.01. Creating and Using Classes

class ReferenceItem {
    // title: string;
    //  year: number;
    //  constructor(newTitle: string, newYear: number) {
    //      console.log('Creating a new ReferenceItem...' );
    //      this.title = newTitle;
    //      this.year = newYear;
    //  }

    #id: number;

    private _publusher: string;

    static department: string = "Classical Literature";

    get publisher(): string {
        return this._publusher.toUpperCase();
    }

    set publisher (newPublisher: string) {
        this._publusher = newPublisher;
    }

    constructor(id: number, public title: string, private year: number) {
             console.log('Creating a new ReferenceItem...' );
             this.#id = id;
    }

    getId(): number {
        return this.#id;
    }

     printItem() {
         console.log(`${this.title} was published in ${this.year}`);
         console.log(ReferenceItem.department);
     }
}

const ref: ReferenceItem = new ReferenceItem(12, 'TypeScript', 2021);
// ref.printItem();
// console.log(ref);
// ref.publisher = 'Publisher';
// console.log(ref.publisher);
// console.log (ref.getId());

