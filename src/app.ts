showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

//--Task 02.01. Basic Types

enum Category { JavaScript, CSS, HTML, TypeScript, Angular }

function getAllBooks(): Array<{id: number, category: Category, title: string, author: string, available: boolean }> {
    const books = [
        { id: 1, category: Category.JavaScript, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true },
        { id: 2, category: Category.CSS, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
        { id: 3, category: Category.HTML, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        { id: 4, category: Category.TypeScript,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
}

function logFirstAvailable(books: any[]): void {
    console.log(`Number of books: ${books.length}`);
    const book = books.find((book: {available: boolean}) => book.available);
    console.log(`Name of first available book ${book.title}`);
}

function getBookTitlesByCategory(category: Category): Array<string> {
    const books = getAllBooks();
    return books.filter((book: {category: Category}) => book.category === category)
    .map((book: {title: string}) => book.title);
}

function logBookTitles(titles: string[]): void {
    titles.forEach((title) => console.log(title))
}

function getBookAuthorByIndex(index: number): [string, string] {
const books = getAllBooks();
const {title, author} = books[index];
return [title, author];
}

function calcTotalPages(): bigint {
    const data = [{ lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 }, { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 }, { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }];

    return data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n)
}

// task 2.1
console.log(getAllBooks());

logFirstAvailable(getAllBooks());

logBookTitles(getBookTitlesByCategory(Category.CSS));

console.log(getBookAuthorByIndex(1));

console.log(calcTotalPages());
