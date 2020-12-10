(function(){

  const OLDWIKI_REGEX = /^(runescape|oldschoolrunescape)\.(wikia|fandom)\.com$/i;

  chrome.webNavigation.onBeforeNavigate.addListener
  (

    function(info)
    {

      const url = new URL(info.url);
      const isOldWiki = OLDWIKI_REGEX.test(url.host);
      if (!isOldWiki)
      {

            return;

      }

      // Make new URL
      var isOldSchool = url.host.includes('oldschool') ? 'oldschool.runescape' : 'runescape';
      const redirectUrl = `https://${isOldSchool}.wiki${url.pathname.replace(/^\/wiki\//i,"/w/")}`;

      // Redirect
      chrome.tabs.update(info.tabId,{url:redirectUrl});

    }

  );

})();