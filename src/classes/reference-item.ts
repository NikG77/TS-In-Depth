export abstract class ReferenceItem {
  // title: string;
  //  year: number;
  //  constructor(newTitle: string, newYear: number) {
  //      console.log('Creating a new ReferenceItem...' );
  //      this.title = newTitle;
  //      this.year = newYear;
  //  }

  #id: number;

  private _publusher: string;
  static department: string = 'Classical Literature';

  get publisher(): string {
      return this._publusher.toUpperCase();
  }

  set publisher(newPublisher: string) {
      this._publusher = newPublisher;
  }

  constructor(id: number, public title: string, protected year: number) {
      console.log('Creating a new ReferenceItem...');
      this.#id = id;
  }

  getId(): number {
      return this.#id;
  }

  printItem() {
      console.log(`${this.title} was published in ${this.year}`);
      console.log(ReferenceItem.department);
  }

  abstract printCitation(): void;
}
