//=require ../../../../node_modules/jquery/dist/jquery.min.js
//=require ../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js

'use strict';

const Site = {
  init: () => {
    Site.Base.init();
  },
  Base: {
    init: () => {},
  },
};

$(document).ready(() => Site.init());
