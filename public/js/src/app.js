import '../../css/src/global.css';

import $ from 'jquery';

import navigation from './navigation';
import container from './container';
import createHashHistory from 'history/lib/createHashHistory'



$(document).ready(() => {

  var history = createHashHistory({ queryKey: false });

  history.listen(location => {
    container.load(location.pathname);
  });
  

  navigation.init();
});