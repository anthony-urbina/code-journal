var $form = document.querySelector('form');
var $placeholderImg = document.querySelector('.placeholder-img');
var $photoURL = document.querySelector('#photo-url-entry-form');
var $title = document.querySelector('#title-entry-form');
var $notes = document.querySelector('#notes-entry-form');
var $ul = document.querySelector('ul');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  var enteredURL = event.target.value;
  $placeholderImg.setAttribute('src', enteredURL);
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {
    entryTitle: $title.value,
    entryPhotoURL: $photoURL.value,
    entryNotes: $notes.value,
    entry: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  var newEntryDomTree = createNewEntryLi(newEntry);
  $ul.prepend(newEntryDomTree);
  viewSwap();

}

function viewSwap() {
  if (data.view === 'entries') {
    $dataViewEntries[1].className = '';
    $dataViewEntryForm[0].className = 'hidden';
  } else if (data.view === 'entry-form') {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
  }
}

document.addEventListener('DOMContentLoaded', preExistingEntries);

function preExistingEntries(event) {
  var li;
  for (var i = 0; i < data.entries.length; i++) {
    li = createNewEntryLi(data.entries[i]);
    $ul.appendChild(li);
  }
  viewSwap();

}

function createNewEntryLi(entry) {
  return generateDomTree(
    'li',
    { 'data-entry-id': entry.entry },
    [generateDomTree(
      'div',
      { class: 'row' },
      [generateDomTree(
        'div',
        { class: 'column-half' },
        [generateDomTree(
          'img',
          { class: 'img-view-entries-size', src: entry.entryPhotoURL })]),
      generateDomTree(
        'div',
        { class: 'column-half' },

        [generateDomTree(
          'div',
          { class: 'h3-icon-flex' },
          [generateDomTree(
            'h3',
            { textContent: entry.entryTitle, class: 'h3-entry-view' }),
          generateDomTree('i', { class: 'fa-solid fa-pen-to-square' })]),
        generateDomTree(
          'div',
          { class: 'entries-notes-spacing', textContent: entry.entryNotes })
        ])])]);

}

function generateDomTree(tagName, attributes, children) {
  if (!children) {
    children = [];
  }
  var element = document.createElement(tagName);
  for (var key in attributes) {
    if (key === 'textContent') {
      element.textContent = attributes.textContent;
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  for (var i = 0; i < children.length; i++) {
    element.appendChild(children[i]);
  }
  return element;
}

window.addEventListener('click', handleClick);
var $dataViewEntries = document.querySelectorAll('[data-view=entries]');
var $dataViewEntryForm = document.querySelectorAll('[data-view=entry-form]');
var $dataViewEditEntry = document.querySelectorAll('[data-view=edit-entry]');
function handleClick(event) {
  if (event.target.textContent === 'Entries') {
    $dataViewEntries[1].className = '';
    $dataViewEntryForm[0].className = 'hidden';
    data.view = 'entries';
  } else if (event.target.matches('.button-new') === true) {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
    data.view = 'entry-form';
  } else if (event.target.matches('#button-save-entry-form') === true) {
    data.view = 'entries';
  } else if (event.target.matches('.fa-solid') === true) {
    $dataViewEditEntry[0].className = '';
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = 'hidden';
    data.view = 'edit-entry';

  }
}
$ul.addEventListener('click', handleEditIconClick);
var $editPlaceholderImg = document.querySelector('.edit-placeholder-img');
var $editPhotoURL = document.querySelector('#photo-url');
var $editTitle = document.querySelector('#title');
var $editNotes = document.querySelector('#notes');

function handleEditIconClick(event) {
  var iconClosestLi = event.target.closest('[data-entry-id]');
  if (event.target.tagName === 'I') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entry === parseInt(iconClosestLi.dataset.entryId)) {
        data.editing = data.entries[i];
        $editPlaceholderImg.src = data.editing.entryPhotoURL;
        $editPhotoURL.value = data.editing.entryPhotoURL;
        $editTitle.value = data.editing.entryTitle;
        $editNotes.value = data.editing.entryNotes;
      }
    }
  }
}

// function newEditPage(entry) {
//   return generateDomTree(
//     'div',
//     { 'data-view': 'edit entry' },
//     [generateDomTree('form',
//       { action: 'form' },
//       [generateDomTree('div', { class: 'row' },
//         [generateDomTree('div', { column: 'half' },
//           [generateDomTree('div', { class: 'dimensions-placeholder-img' }, )])])])]);
// }

// set attriute data-entry-id = newEntryId to each new li
// listen for clicks onparent elemement of all rendered entries aka add event listener on the ul
// if edit icon is clicked show the form
// also, find the matching entry object in the data model and assign it to editing property if an edit item was clicked
// basically, you'll run a for loop thats the length of entries so u can look through each one until you find the one with the entry id property
// that matches the id property of the parent li of the button that was clicked (refer to dom delegation if u have to)
// then, prepopulate the entry form with the clicked entries values from the object found in the data model
// so by clicking on it, i can see which li its a part of, thus i can look inside of it, thus i can pull the data from there and insert it into my values for the edit box
