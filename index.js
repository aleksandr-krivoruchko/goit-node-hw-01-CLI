const contactsOperations = require("./contacts");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contactById);
      break;

    case "add":
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
// invokeAction({ action: "get", id: "5" });
invokeAction(argv);
