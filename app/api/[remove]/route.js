const prisma = require('../../../database/db.js');

export const DELETE = async (req, res) => {
  console.log('DELETE contact');

  const urlSliced = req.url.slice(req.url.lastIndexOf('/') + 1);

  await prisma.contact.delete({ 
    where: { contactId: urlSliced },
  });

  return new Response("Contact removed");
}