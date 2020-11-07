const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;

$(document).ready(function () {
  let db;

  $("#grid .cell").on("click", function () {
    // let cCell = this;
    let ri = Number($(this).attr("ri"));
    let ci = Number($(this).attr("ci"));
    let Address = String.fromCharCode(ci + 65) + (ri + 1);
    $("#address-input").val(Address);
  });

  // Create new file
  $("#New").on("click", function () {
    db = [];
    let rows = $("#grid").find(".row");
    for (let i = 0; i < rows.length; i++) {
      let cells = $(rows[i]).find(".cell");
      let row = [];
      for (let j = 0; j < cells.length; j++) {
        $(cells[j]).html(""); // setting all cell's html to ""
        let cell = {
          value: "",
        };
        row.push(cell);
      }
      db.push(row);
    }
    console.log(db);
  });

  $("#Save").on("click", async function () {
    let sdb = await dialog.showOpenDialog();
    let jsonData = JSON.stringify(db);
    fs.writeFileSync(sdb.filePaths[0], jsonData);
  });

  // Saving our record in the 2D Array database
  $("#grid .cell").on("blur", function () {
    let ri = Number($(this).attr("ri"));
    let ci = Number($(this).attr("ci"));
    db[ri][ci] = $(this).html();
    console.log(db[ri][ci]);
  });

  (function init() {
    $("#New").trigger("click");
  })();
});
