import { NextResponse } from "next/server";

const { uploadImageToS3Bucket } = require('../../../s3.js');

export const GET = async (req, res) => {
  console.log('GET image URL');

  try {
    const imageUrl = await uploadImageToS3Bucket();
    console.log(imageUrl);

    return NextResponse.json(imageUrl);
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    return NextResponse.json(error);
  }
}