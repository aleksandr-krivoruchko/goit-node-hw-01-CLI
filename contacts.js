const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId.toString());
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((el) => el.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const filteredContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
