export function debounce(func, wait, immediate) {
  var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


export function decodeToken(token) {
  var parts, header, claim, signature;
  token = token || '';
  parts = token.split('.');
  if (parts.length === 3) {
    header = parts[0];
    claim = parts[1];
    signature = parts[2];
    header = JSON.parse(decodeURIComponent(escape(atob(header))));
    claim = JSON.parse(decodeURIComponent(escape(atob(claim))));
  }

  return {
    header: header,
    claim: claim,
    signature: signature
  }
}

export function getLocation(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
}