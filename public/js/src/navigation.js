import '../../css/src/navigation.css';
import $ from 'jquery';

var $navEl = $('nav[role="navigation"]'),
    $rightNavList = $navEl.find('ul.nav-right'),
    $rightNavListItems = $rightNavList.find('li');

function rightListItemClickEventHandler() {
  if(!$(this).hasClass('active')) {
    $rightNavListItems.removeClass('active');
    $(this).addClass('active');
  }
}

export default {
  init() {
    $rightNavListItems.on('click', rightListItemClickEventHandler);
  },

  destroy() {
    $rightNavListItems.off('click');
  }

};