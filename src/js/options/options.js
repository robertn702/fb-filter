import OPTION_KEYS from 'option_keys';
import DEFAULT_OPTIONS from 'default_options';

const idToKey = {
  'comments-toggle': OPTION_KEYS.COMMENTS,
  'sponsored-toggle': OPTION_KEYS.SPONSORED,
  'suggested-toggle': OPTION_KEYS.SUGGESTED,
  'trends-toggle': OPTION_KEYS.TRENDS
};

const keyToId = _.reduce(idToKey, (result, value, key) => {
  result[value] = key;
  return result;
}, {});

const restoreOptions = () => {
  chrome.storage.sync.get((options) => {
    const restoredOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    _.forEach(restoredOptions, (shouldShow, key) => {
      document.getElementById(keyToId[key]).checked = shouldShow
    });
  });
};

const createListeners = () => {
  _.forEach(idToKey, (optionKey, idSelector) => {
    $(`#${idSelector}`).change(function() {
      const updatedOptions = {
        [optionKey]: this.checked
      };
      chrome.storage.sync.set(updatedOptions, () => {
        console.log('[options] save successful');
      })
    });
  });
}

$(document).ready(function() {
  createListeners();
  restoreOptions();
});
