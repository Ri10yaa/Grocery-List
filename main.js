const prompt = require("prompt-sync")({ sigint: true });
const fsi = require("./file_ops.js");
const eval = require("./validation.js");

const fs = require("fs");

let option = true;
console.log("\nGROCERY LIST\n");

if (!fs.existsSync("list.txt")) {
  // check if file exists or not, if exists, append the count else create and append
  fsi.writefile("Grocery List");
}

const addItem = () => {
  const data = fsi.readfile();

  var item_name = prompt("Enter the item to be added:").toLowerCase();
  if (!eval.isString(item_name)) {
    console.log("Please enter a string without number.");
  } else {
    const pattern = new RegExp("^" + item_name + ",.*", "gm");
    const match = data.match(pattern);

    if (match == null) {
      // check if item already exists
      var quantity = prompt("Enter the required quantity:");
      if (!eval.isNumber(quantity)) {
        console.log("Please enter a number.");
      } else {
        const line = "\n" + item_name + "," + quantity;

        fsi.appendfile(line); // append the item
        console.log("Item added.\n");
      }
    } else {
      console.log("Item already exists.\n");
    }
  }
};

const deleteItem = () => {
  var item_to_delete = prompt("Enter the item name to delete : ").toLowerCase();

  if (!eval.isString(item_name)) {
    console.log("Please enter a string without number.");
  } else {
    const data = fsi.readfile();
    const list_data = data.split("\n");
    const pattern = new RegExp("^" + item_to_delete + ",.*", "gm");
    const line = data.match(pattern);

    if (line != null) {
      // check if the item exists
      console.log(line);
      let newData = null;
      if (line == list_data[list_data.length - 1]) {
        list_data.pop();
        newData = list_data.join("\n");
      } else {
        newData = data.replace(line + "\n", ""); // remove the line, not working for last line of the file
      }

      fsi.writefile(newData); // write the file after removing the line
      console.log("Deleted the item.");
    } else {
      console.log("Item not found.\n");
    }
  }
};

const updateItem = () => {
  let item_to_update = prompt(
    "Enter the item to update the quantity : "
  ).toLowerCase();

  if (!eval.isString(item_to_update)) {
    console.log("Please enter a string without number.");
  } else {
    const data = fsi.readfile();
    const pattern = new RegExp("^" + item_to_update + ",.*", "gm");
    const line = data.match(pattern);

    if (line != null) {
      // check if the item exists already
      let qty = prompt("Enter the new quatity : ");
      if (!eval.isNumber(qty)) {
        console.log("Please enter a number.");
      } else {
        const values = line[0].split(",");
        values[1] = qty;
        const newData = data.replace(line, values.join(",")); // replace the line with correct data

        fsi.writefile(newData);
        console.log("Updated quantity.");
      }
    } else {
      console.log("Item not found.\n");
    }
  }
};

const viewItems = () => {
  const data = fsi.readfile().split("\n");
  if (data.length == 1 || data == null || data == undefined) {
    console.log("No items");
  } else {
    for (let i = 1; i < data.length; i++) {
      let item = data[i].split(",");
      console.log(item[0] + "-" + item[1]);
    }
  }
};

const mainmenu = () => {
  console.log(
    "==================================================================\n"
  );
  console.log("Select any option : ");
  console.log(
    "\t1. Add an item\n \t2. Delete an item\n \t3. Update quantity of an item\n \t4. View the list\n \t5. Exit\n"
  );
  const opt = parseInt(prompt(":"));
  return opt;
};

do {
  const opt = mainmenu();
  switch (opt) {
    case 1:
      addItem();
      break;
    case 2:
      deleteItem();
      break;
    case 3:
      updateItem();
      break;
    case 4:
      viewItems();
      break;
    case 5:
      option = false;
      break;
    default:
      console.log("Choose option from only from 1 to 5");
  }
} while (option);
