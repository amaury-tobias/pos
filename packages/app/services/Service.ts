export class Service {
  private readonly name: string
  constructor() {
    this.name = Object.getPrototypeOf(this).constructor.name
  }
}
