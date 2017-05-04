module.exports = {
  "styles": {
    "srcPath": "src/styles",
    "srcFiles": "src/styles/**/*",
    "srcMainFiles": ["src/styles/*.scss", "!src/styles/_*.scss"],
    "dest": "dist/css"
  },

  "js": {
    "srcFiles": [
      'src/js/**/*.js'
    ],
    "vendorFiles": [
      'node_modules/owl.carousel/dist/owl.carousel.js',
      'node_modules/tether/dist/js/tether.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/waypoints/lib/jquery.waypoints.js',
      'node_modules/sticky-js/dist/sticky.min.js',
      'node_modules/jquery-match-height/dist/jquery.matchHeight.js',
      'node_modules/jquery.scrollto/jquery.scrollTo.js',
      'node_modules/jQuery-SlotMachine/dist/jquery.slotmachine.js',
    ],
    "dest": "dist/js"
  },

  "svgIcon": {
    "mode": {
      "symbol": { // symbol mode to build the SVG
        "render": {
          "css": false, // CSS output option for icon sizing
          "scss": false // SCSS output option for icon sizing
        },
        "dest": 'dist/icons/sprite', // destination folder
        "prefix": '.svg--%s', // BEM-style prefix if styles rendered
        "sprite": 'sprite.svg', //generated sprite name
        "example": false // Build a sample page, please!
      }
    },
    "src": "src/svg/**/*.svg",
    "svg": {
      "xmlDeclaration": false, // strip out the XML attribute
      "doctypeDeclaration": false // don't include the !DOCTYPE declaration
    }
  },
  "cssVendor":{
    "vendorCss": [
      'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
      'node_modules/jQuery-SlotMachine/dist/jquery.slotmachine.css',
    ],
    "dest": "dist/css"
  },

  "styleguide": {
    "srcFiles": "doc_assets/**/*",
    "styles": {
      "srcFiles": "src/styleguide/themes/cortana-theme/sass/cortana.scss",
      "dest": "src/styleguide/themes/cortana-theme/doc_assets/css"
    }
  },

  "mockups": {
    "src": "src/mockups",
    "dest": "dist/mockups"
  },

  "icons": {
    "src": "src/icons/*",
    "dest": "dist/icons"
  },

  "fonts": {
    "src": "src/fonts/*/*",
    "dest": "dist/fonts"
  },

  "images": {
    "src": "src/images/*",
    "dest": "dist/images"
  },

  "server": {
    "baseDir": "dist/"
  }
}
