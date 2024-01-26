// For use with WP plugin Age GamepadEvent. Put this script in the footer of the homepage

var cookie_setter_orig = document.__lookupSetter__("cookie").bind(document);
var cookie_getter_orig = document.__lookupGetter__("cookie").bind(document);
window.cookieList = [];
window.disableCookies = true;

Object.defineProperty(document, "cookie", {
  get: function () {
    if(!window.disableCookies) {
      return cookie_getter_orig();
    } else {
      var response = "";
      window.cookieList.forEach(function(cookie){
        var splitted = cookie.split(";")[0].split("=");
        response += splitted[0] + "=" + splitted[1] + "; ";
      });
      return response.slice(0, response.length - 2);
    }
  },
  set: function (val) {
    if(!window.disableCookies) {
      cookie_setter_orig(val);
    } else {
      window.cookieList.push(val);
    }
  }
});

function enableCookies()
{
  window.disableCookies = false;
  window.cookieList.forEach(function(cookie){
    document.cookie = cookie;
  });
  window.cookieList =[];
}
