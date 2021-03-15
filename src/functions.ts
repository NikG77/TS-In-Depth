import { Category } from './enum';
import { Book, LibMgrCallback } from './intefaces';
import { BookOrUndefined, BookProperties } from './types';

export function getAllBooks(): ReadonlyArray<Book> {
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

// export function getProperty(book: Book, prop: BookProperties): any {
//   if (typeof book[prop] === 'function') {
//       return (book[prop] as Function).name;
//   }
//   return book[prop];
// }

export function getProperty<TObject, TKey extends keyof TObject>(book: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof book[prop] === 'function') {
        return book[prop]['name']; // или return prop;
    }
    return book[prop];
}

export function logFirstAvailable(books: readonly any[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);
    const book = books.find((book: { available: boolean }) => book.available);
    console.log(`Name of first available book ${book.title}`);
}

export function getBookTitlesByCategory(category: Category ): Array<string> {
    const books = getAllBooks();
    return books
        .filter((book: { category: Category }) => book.category === category)
        .map((book: { title: string }) => book.title);
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [string, string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

export function calcTotalPages(): bigint {
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

// 03. export Functions
// Task 03.01. export Function Type

// export function createCustomer(name: string, id: number): string {
//     return `${id}-${name}`;
// }

// const myID: string = createCustomer('Ann', 10);
// console.log(myID);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number) => `${id}-${name}`;
// idGenerator = createCustomer;
// console.log(idGenerator('Boris', 20));

// Task 03.02. Optional, Default and Rest Parameters

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Creating customer name ${name}`);
    if (age) {
        console.log(`Creating customer age ${age}`);
    }
    if (city) {
        console.log(`Creating customer city ${city}`);
    }
}

export function getBookByID(id: number): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
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
// createCustomer('Anna');
// createCustomer('Anna', 30);
// createCustomer('Anna', 30, 'Kyiv');

// console.log(getBookTitlesByCategory());
// logFirstAvailable();

// console.log(getBookByID(1));

// const myBooks = сheckoutBooks('Ann', ...[1, 2, 4]);
// console.log(myBooks);

// Task 03.03. export Function Overloading

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]) {
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

// Task 03.04. Assertion export Functions
// если два типа то можно использовать
export function assertStringAndNumberValue(val: any): asserts val is string | number {
    if (typeof val !== 'string' && typeof val !== 'number') {
        throw new Error('value should have been a string or number');
    }
}

export function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

// console.log(bookTitleTransform('строка'));
// console.log(bookTitleTransform(1));

// 04. Interfaces
// Task 04.01. Defining an Interface

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// 07. Generics
// Task 07.01. Generic Functions

export function purge<T>(inventory: Array<T>): T[] {
    return inventory.slice(2);
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found.');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(`Error message: ${err.message}`);
    } else console.log(titles);
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found.');
            }
        }, 2000);
    });
}


export async function logSearchResults(category: Category): Promise<void> {
    const titles = await getBooksByCategoryPromise(category);
    console.log(titles);

}



