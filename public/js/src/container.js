import mustache from 'mustache';
import $ from 'jquery';
import '../../css/src/container.css';
import '../../css/src/submissions.css';


var $containerEl = $('.container');

var template = `
  <ul class="submissions">
    {{#submissions}}
      <li>
        <h3 class="title"><a href="{{link_to}}">{{title}}</a></h3 >
         <div class="subtitle">by <a href="#">{{user.name}}</a> {{timeago}}, source <a href="#">{{source}}</a></div>
         <p class="description">{{description}}</p>
         <div class="submission-footer"><a href="#">12 comments</a> <a href="#">share</a></div>
      </li> 
    {{/submissions}}
  </ul>
`;


function loadSubmissions(type) {
  type = type.split('/')[1];
  $.get('/api/submissions?q=' + type)
    .then(data => {
      data = data.map(entry => {
        entry.source = entry.link_to.replace(/https?:\/\//, '');
        return entry;
      }); 

     $containerEl.html(mustache.render(template, {submissions: data}));

    });
}

export default {
  load: function(pathname) {
    switch(pathname) {
      case '/hot':
        loadSubmissions('/hot');
      break;
      case '/latest':
      break;
      case '/alltime':
      break;
      default:
      break;
    }
  }
}