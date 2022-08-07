# webpack-system-operations
System operation operation collection for webpack build. You can attach any of these operations  (run process, sleep, wait until) to any webpack hook before, after and in the middle of the builds with 
[webpack-hook-attacher-plugin](https://www.npmjs.com/package/@wecdev/webpack-hook-attacher-plugin) 

## Install
`npm install @wecdev/webpack-system-operations --save-dev `

## I know I can do better :)
If you have found bug or need an additional operation don't hesitate to contact me.

## Copyright & Support
Copyright (c) 2022, Roland Szikora. 
You can support this package at https://www.patreon.com/rolandszik 

## Licensing
This project run under AGPL-3.0

Full license
https://www.gnu.org/licenses/agpl-3.0.txt

TLDR
https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)

## Use Operations 
You can attach pre written opertaions to any webpack hook during the webpack or webpack-dev-server build from 

such as 
- run process
- wait until
- sleep

#### Usage

Webpack.config.js:

```ts
import {
    WebpackHookAttacherPlugin,
    Options    
} from '@wecdev/webpack-hook-attacher-plugin';

public static getAppModuleWebpackHookAttacherPlugin(): WebpackHookAttacherPlugin {

  let options: Options = new Options();
  options.silent = false;
  
  
  //attach to afterEmit hook
  options.afterEmit.addOperations(    
    new RunProcess({
        additionalName: `start-webpack-devserver-background-script and start-webpack-devserver-content-script`,
        commands: [
            {
                processCreationType: ProcessCreationType.spawn,
                execute: 'npm.cmd',
                args: ['run', 'start-webpack-devserver-background-script'],
                options: {
                    detached: true
                }
            },
            {
                processCreationType: ProcessCreationType.spawn,
                execute: 'npm.cmd',
                args: ['run', 'start-webpack-devserver-content-script'],
                options: {
                    detached: true
                }
            },
        ]
    }),
    new Sleep( {
        miliseconds: 5000
    }),
    new WaitUntil ({
        repeatCheckMiliseconds: 1000,
        condition: (): boolean => { return fs.pathExists('./anyFileName.txt'); }
    })         
  );
  
  

  let instance: WebpackHookAttacherPlugin = new WebpackHookAttacherPlugin(options);
  return instance;
}



...
//somewhere in the webpack config
...
 plugins: [
    ...
    getAppModuleWebpackHookAttacherPlugin()
    ...
]
...
```
