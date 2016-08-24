// const PUBLIC_KEY = require('./public_key');

const STYLES_DIR = 'styles/';
const IMAGES_DIR = 'images/';
const SCRIPTS_DIR = 'js/';
// const BROWSER_ACTION_ICON = '';

// const ICON_SIZES = [16, 32, 48, 128];

module.exports = {
  'manifest_version': 2,
  'name': 'Facebook Filter',
  'description': '',
  'version': '1.0.0',
  // 'icons': ICON_SIZES.reduce((result, num) => {
  //   result[num] = `${IMAGES_DIR}icon${num}.png`;
  //   return result;
  // }, {}),
  'page_action': {
    // 'default_icon': `${IMAGES_DIR}${BROWSER_ACTION_ICON}`,
    'default_title': 'Facebook Filter'
  },
  // 'key': PUBLIC_KEY,
  'permissions': [
    'activeTab',
  ],
  'content_scripts': [{
    'all_frames': false,
    'css': [`./${STYLES_DIR}content.css`],
    'js': [`./${SCRIPTS_DIR}content.js`],
    'matches': ['*://www.facebook.com/*']
    // 'run_at': 'document_end'
  }],
  'web_accessible_resources': [
    '../node_modules/jquery/dist/jquery.min.js',
    // `${STYLES_DIR}popup.css`,
    `${SCRIPTS_DIR}content.js`,
    `${SCRIPTS_DIR}content.css`,
    // `${SCRIPTS_DIR}popup.js`,
    `${IMAGES_DIR}*`
  ]
};