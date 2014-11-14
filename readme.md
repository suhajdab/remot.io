# [remot.io](http://remot.io) [![Nodejitsu Deploy Status Badges](https://webhooks.nodejitsu.com/suhajdab/remot.io.png)](https://webops.nodejitsu.com#nodejitsu/webhooks)

by [@suhajdab](http://twitter/suhajdab) @ [onereason.eu](http://onereason.eu)

Remot.io is a simple, no install controller for html based presentations. Well, actually it can be used with any page that listenes for keyboard events or has a javascript API. The remot.io configuration can easily be extended to call a custom method depending on the page the bookmarklet has been run on.



2012-06-12 - initial release

* Triggering keyboard events only works as expected in Chrome and Firefox. Have not been able to set the keyCode on a keyboard event in Safari and have not done any testing in IE yet. Ideas, solutions, contributions are welcome! Just visit http://github.com/suhajdab/remot.io and share your insight.
* Remot.io has full support for the Reveal.js presentation framework meaning it can control it on any receiver browser. This is thanks to Reveal's clever api, so remot.io doesn't have to rely on triggering keyboard events.
* The Impress.js presentation framework and the slideshare.com site are supported only on the two above mentioned receiver browsers.
