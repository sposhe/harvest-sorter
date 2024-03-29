// sorts an array of objects by a key name
const sortBy = (arr, name) => {
  arr.sort(function(a,b) {
    let itemA = a[name];
    let itemB = b[name];
    if (itemA < itemB) return -1;
    if (itemA > itemB) return 1;
    return 0;
  });
};

// sorts the timesheet alphabetically
const sortTimesheet = () => {

  // jquery object of each entry
  let $listitems = $('.js-day-view-entry-list > tr');

  // declaring array variables used later
  let items = [];
  let order = [];

  /**
   * for each time entry, add an object to the items array
   * index: initial index of the entry
   * task: normalized string of the project and task names
   * order: placeholder property that will be used to store the sorted order
   */
  $listitems.each(function(i) {
    let project = $(this).find('.entry-client').text();
    let task = $(this).find('.entry-task').text();
    let combined = (project + task).replace(/\W/g, '').toUpperCase();
    items.push({
      index: i,
      task: combined,
      order: 0
    });
  });

  // sort the items array alphabetically by the task name
  sortBy(items, 'task');

  // store the current order of the array in the order property
  items.forEach(function(v, i) {
    items[i].order = i;
  });

  // sort the items array by the index property to restore the original order
  sortBy(items, 'index');

  // simplify the array into the order values
  order = items.map(item => item.order);

  // order the entries alphabetically
  $listitems.each(function(i) {
    $(this).attr('style',`order: ${order[i]};`);
  });

};

// sort button markup
const sortButton = '<div class="sort-timesheet-wrapper"><button type="button" class="sort-timesheet js-sort-timesheet"><div class="sort-timesheet-button hui-button hui-button-secondary w-100">Sort</div></button></div>';

// append sort button
$('.js-timesheet-view').prepend(sortButton);

// bind click event
$('.js-sort-timesheet').on('click', function() {
  sortTimesheet();
});
