# rvrb-autodope-snippet
Local running autodop script snippet for RVRB

## Install guide
* In a Chrome based browser enable the Developer Tools
    - Command + Option + I / Ctrl + Option + I
    - right-click and select `Inspect`
* Select tab `Sources`
* In the subselection select `Snippets`
* Click `New snippet`
* Name the snippet 'RVBR' or whatever you want it to be called
* Paste contents of [src.js](./src.js)
* Save (Command + s / Ctrl + S)
* Right click the newly created snippet ('RVBR' or other chosen name) and select `Run`.

## User instructions
This creates an AutoDope button in the bottom right corner of the screen. Click it to toggle autodop on or off.

## console acces for testing or handling
```
// Access from console for debugging
window.autoDope.toggle();
window.autoDope.destroy();
```
