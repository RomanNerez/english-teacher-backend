export default abstract class Transformer<T> {
  abstract transform(entity: T): Record<string, any>;

  collection(items: T[]): Record<string, any>[] {
    return items.map((item) => this.transform(item));
  }
}