const contactsOperations = require("./contacts");

async function invokeAction({ action, id, data }) {
  switch (action) {
    case "getListContacts":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "getContactById":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contactById);
      break;

    case "removeContact":
      await contactsOperations.removeContact(id);
      console.log("contact removed successfully");
      break;

    case "addContact":
      const addedContact = await contactsOperations.addContact(data);
      console.log(addedContact);
      break;

    default:
      console.log("Unknown case");
      break;
  }
}
// invokeAction({ action: "getListContacts" });
// invokeAction({ action: "getContactById", id: "3" });
invokeAction({
  action: "removeContact",
  id: 11,
});
const newContact = {
  id: "11",
  name: "Chuck Norris",
  email: "norris@anonymus.com",
  phone: "123-45-68",
};
// invokeAction({
//   action: "addContact",
//   data: newContact,
// });
