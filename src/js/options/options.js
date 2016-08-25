const idToKey = {
  'comments-toggle': 'comments',
  'sponsored-toggle': 'sponsored',
  'trends-toggle': 'trends'
};

const keyToId = _.reduce(idToKey, (result, value, key) => {
  result[value] = key;
  return result;
}, {});

const DEFAULT_OPTIONS = _.map(idToKey, (value) => value);

const restoreOptions = () => {
  chrome.storage.sync.get('filter-options', (options) => {
    const restoredOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  });
};

const saveOption = () => {

};

$(document).ready(function() {
  console.log('[options] chrome.storage.sync: ', chrome.storage.sync);

  $('#comments-toggle').change(function(e) {
    console.log('[options] e: ', e);
  });

});
