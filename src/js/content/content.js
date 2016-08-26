import OPTION_KEYS from 'option_keys';
import DEFAULT_OPTIONS from 'default_options';

const SELECTOR = {
  comments: '.UFIComment',
  commentsLink: '._ipm:contains(Comment)',
  replies: '.UFIReplyList',
  sidebarAdTitle: '.adsCategoryTitleLink',
  sidebarSection: '.ego_section',
  sponsoredLink: '.uiStreamSponsoredLink',
  storyCard: '[data-testid=fbfeed_story]',
  suggestedPost: 'span:contains(Suggested Post)',
  trends: '#pagelet_trending_tags_and_topics',
};

$(document).ready(function() {
  chrome.storage.sync.get((options) => {
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    $(document).bind('DOMSubtreeModified', function() {
      $(SELECTOR.sidebarAdTitle).closest(SELECTOR.sidebarSection).hide();
      if (!options[OPTION_KEYS.TRENDS]) {
        $(SELECTOR.trends).hide();
      }
      /* News Feed */
      if (!options[OPTION_KEYS.SPONSORED]) {
        $(SELECTOR.sponsoredLink).closest(SELECTOR.storyCard).hide();
      }
      if (!options[OPTION_KEYS.SUGGESTED]) {
        $(SELECTOR.suggestedPost).closest(SELECTOR.storyCard).hide();
      }
      if (!options[OPTION_KEYS.COMMENTS]) {
        $(SELECTOR.commentsLink).hide();
        $(SELECTOR.comments).hide();
        $(SELECTOR.replies).hide();
      }
    });
  });
});
