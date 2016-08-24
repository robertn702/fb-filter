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
  $(document).bind('DOMSubtreeModified', function() {
    $(SELECTOR.trends).hide();
    $(SELECTOR.sidebarAdTitle).closest(SELECTOR.sidebarSection).hide();
    /* News Feed */
    $(SELECTOR.suggestedPost).closest(SELECTOR.storyCard).hide();
    $(SELECTOR.sponsoredLink).closest(SELECTOR.storyCard).hide();
    $(SELECTOR.commentsLink).hide();
    $(SELECTOR.comments).hide();
    $(SELECTOR.replies).hide();
  });
});
