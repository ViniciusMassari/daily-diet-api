import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import {makeUpdateProfilePhoto} from '@/use-cases/factories/make-update-profile-photo'
import { UnableToUploadImage } from '@/use-cases/errors/UnableToUploadFile';
import { InvalidData } from '@/use-cases/errors/InvalidData';
import verifyImageType from '@/utils/verifyImageType';

const profilePhotoParamsSchema = z.object({
  userId: z.string().uuid(),
});

let imageData:Buffer;
export async function updateProfilePhotos(req:FastifyRequest, rep: FastifyReply){
  const part = await req.file();

  const {userId} = profilePhotoParamsSchema.parse(req.params)
  if(userId !== req.user.sub)
    rep.status(403).send({ message: 'Not allowed' });
  
  if(part !== undefined && part.file !== undefined ){
    const isAcceptedImage = await verifyImageType(part)
    if(!isAcceptedImage){
      rep.status(403).send({ message: 'Only JPEG and JPG images allowed' });
    }
    const imageBuffer:Buffer =  part.file.read()
    imageData = Buffer.from(imageBuffer)
  } 

  try {
    const updateProfilePhoto = makeUpdateProfilePhoto();
    await updateProfilePhoto.execute({userId, photoBuffer:imageData})
    rep.status(200).send({message:'Image uploaded successfully'});
  } catch (error) {
    if(error instanceof UnableToUploadImage || error instanceof InvalidData){
      rep.status(400).send({message:error.message});
    }
    
  }

   



  

 
}