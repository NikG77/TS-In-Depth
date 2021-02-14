export default class Shelf<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }

  getFirst(): T {
    return this.items[0];
  }

  // find(title: string): T {
  //   return this.find(item => item.title === title);
  // }

  // printTitles(): void {
  //   this.items.forEach(item => console.log(item.title));
  // }
}