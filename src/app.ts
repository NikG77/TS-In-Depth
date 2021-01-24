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

function getAllBooks() {
    const books = <const>[
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

function getBookByID(id: number): any {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer Name ${customer}`);

    const titles: string[] = [];

    bookIDs.forEach(id => {
        const book = getBookByID(id);
        if (book?.available) {
            titles.push(book.title);
        }
    });
    return titles;
}

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

function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

console.log(bookTitleTransform('строка'));
console.log(bookTitleTransform(1));
