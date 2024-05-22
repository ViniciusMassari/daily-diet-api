import { MultipartFile } from '@fastify/multipart';
import { fileTypeFromStream } from 'file-type';

const ACCEPTED_TYPES: string[] = ['jpg', 'jpeg'];
export default async function verifyImageType(part:MultipartFile){
  const image = await fileTypeFromStream(part.file)
  console.log(image);
  
  if(image){
    const isAccepted = ACCEPTED_TYPES.includes(image.ext)
    return isAccepted
  }
  return false
}