import AWS from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
  signatureVersion: 'v4'
});

export const uploadImageToS3Bucket = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex')

  const params = {
    Bucket: 'uxproject-file-upload-s3-bucket',
    Key: imageName,
    Expires: 60
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
  } catch(error) {
    throw new Error(`Error uploading image to S3: ${error.message}`);
  }
};