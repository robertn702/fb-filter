$(document).ready(function() {
  const SELECTOR = {
    storyCard: '._4ikz',
    suggestedPost: 'span:contains(Suggested Post)',
    sponsoredLink: '.uiStreamSponsoredLink',
    trends: '#pagelet_trending_tags_and_topics',
    sidebarAdTitle: '.adsCategoryTitleLink',
    sidebarSection: '.ego_section',
    commentsLink: '._ipm:contains(Comment)',
    comments: '.UFIComment',
    replies: '.UFIReplyList'
  };

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

  // const filterContent = () => {
  //   /* Sidebar */
  //   $(SELECTOR.trends).hide();
  //   $(SELECTOR.sidebarAdTitle).closest(SELECTOR.sidebarSection).hide();
  //   /* News Feed */
  //   $(SELECTOR.suggestedPost).closest(SELECTOR.storyCard).hide();
  //   $(SELECTOR.sponsoredLink).closest(SELECTOR.storyCard).hide();
  //   $(SELECTOR.commentsLink).hide();
  //   $(SELECTOR.comments).hide();
  //   $(SELECTOR.replies).hide();
  //   setTimeout(filterContent, 500);
  // };

  // filterContent();
});
