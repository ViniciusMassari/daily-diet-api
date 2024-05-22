import { UseCase } from '../use-case';
import { UserRepository } from '@/repositories/user-repository';
import { InvalidData } from '../errors/InvalidData';
import { UnableToUploadImage } from '../errors/UnableToUploadFile';


type Input = {
photoBuffer: Buffer;
userId: string;
};
type Output = string;

export class UpdateProfilePhotoUseCase implements UseCase<Input, Output> {
  constructor(private userRepository: UserRepository) {}
  async execute(props: Input): Promise<Output> {
    const {photoBuffer, userId} = props;
    if(!Buffer.isBuffer(photoBuffer)){
      throw new InvalidData();
    }
    const user= await this.userRepository.updateProfilePhoto(photoBuffer, userId);4
    if(!user){
      throw new UnableToUploadImage();
      
    }

    return user;
  }
}
