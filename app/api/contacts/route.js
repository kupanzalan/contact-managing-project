import { NextResponse } from "next/server";

const prisma = require('../../../database/db.js');

export const GET = async (req, res) => {
  console.log('GET contacts');

  const contactsArray = await prisma.contact.findMany();
  return NextResponse.json(contactsArray);
}

export const POST = async (req, res) => {
  console.log('POST contacts');
  const contact = await req.json();

  const newContact = await prisma.contact.create({
    data: {
      contactId: contact.contactId,
      name: contact.name, 
      phoneNumber: contact.phoneNumber,
      email: contact.email, 
      picture: contact.picture
    },
  });

  return NextResponse.json(newContact);
}

export const PUT = async (req, res) => {
  console.log('PUT contacts');
  const contact = await req.json();

  const contactToUpdate = await prisma.contact.findMany({ 
    where: { contactId: contact.contactId },
  });

  if (!contactToUpdate) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  await prisma.contact.update({
    where: {
      contactId: contact.contactId,
    }, 
    data: {
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      email: contact.email, 
      picture: contact.picture
    }
  });

  return new Response("Contact updated");
}
