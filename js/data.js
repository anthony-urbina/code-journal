/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data value', dataJSON);
}

var getDataValue = localStorage.getItem('data value');
var parseDataValue = JSON.parse(getDataValue);
data = parseDataValue;
