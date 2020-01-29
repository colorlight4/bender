# bender
bender is your friend and will gladly generate all the assets you need! At least that's what you think he does...

- [Setup Guide](#setup-guide)
- [Documentation](#documentation)

## Setup Guide

### Preconditions
Make sure you have the following tools available on your machine:
- [node.js](https://nodejs.org/en/)
- [inkscape](https://inkscape.org/release/inkscape-0.92.4/mac-os-x/macports/dl/)
- [gulp-cli](https://gulpjs.com/) *(optional)*

### Setup
1. Clone this repo and make sure you've got the right branch
1. navigate to the local repo `$ cd YOURPATH/bender/`
1. install depencies `$ npm i`

## Documentation
`$ gulp [OPTION]` 

> Optimize the `svg` in `src` and export them as given by the format options. Anyway the option the folder structure inside the `src` folder will be mirrored into the output and you will be notified when the icons are processed. For the possible options see below

**Note:** if you haven't installed `gulp-cli` globally or try to run this on windows please run `$ npm run gulp`. Options can't be passed and you need to adapet the source code of bender.

### Formats
Note that only one Format Option can be passed per run.

Option                   | Description                                |
------------------------ | ------------------------------------------ |
`--svg`                  | Default (therefore the option is optional) -  exports the icons to `dist/svg` |
`--pdf`                  | Exports the Icons as `pdf` into `dist/pdf` |
`--png`                  | Exports the Icons as `png` into `dist/png` |
`--font`                 | Exports the Icons as `ttf, eot and woff` files into `dist/font` |

### Adjustemts
Option                   | Description                                |
------------------------ | ------------------------------------------ |
`-c [HEX-COLOR]`         | Changes the color of the output to the defined one. |
`-r [NUNBER]`            | Resize to the given pixel amount - will always be a square. |
`-p [NUMBER]`            | Adds padding to the icon. |

------

##### Disclaimer
`$` is a marker for a cli command - you dont need to copy or insert it.

