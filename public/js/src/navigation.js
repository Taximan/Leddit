import '../../css/src/navigation.css';
import $ from 'jquery';

const navigation = (() => {
  var $navEl = $('nav[role="navigation"]'),
      $rightNavList = $navEl.find('ul.nav-right'),
      $rightNavListItems = $rightNavList.find('li');

  function rightListItemClickEventHandler() {
    if(!$(this).hasClass('active')) {
      $rightNavListItems.removeClass('active');
      $(this).addClass('active');
    }
  }

  return {
    init: function() {
      $rightNavListItems.on('click', rightListItemClickEventHandler);
    },
    destroy: function() {
      $rightNavListItems.off('click');
    }
  };

}());

export default navigation;