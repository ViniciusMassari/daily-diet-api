export class UnableToUploadImage extends Error {
  constructor() {
    super('Unable to upload image, try again later');
  }
}
