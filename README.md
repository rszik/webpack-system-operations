# webpack-system-operations
System operation operation collection for webpack build. You can attach any of these operations  (run process, sleep, wait until) to any webpack hook before, after and in the middle of the builds with 
[webpack-hook-attacher](https://www.npmjs.com/package/@wecdev/webpack-hook-attacher) 

## Install
`npm install @wecdev/webpack-system-operations --save-dev `

## I know I can do better :)
If you have found bug or need an additional operation don't hesitate to contact me.

## Copyright & Support
Copyright (c) 2022, Roland Szikora. 
You can support this package at https://www.patreon.com/rolandszik 

## Licensing
See LICENSE.txt

## Use Operations 
You can run a file operation:

- onBuildStart (compilation hook)
- onAfterPlugins (afterPlugins hook)
- onCompile (watchRun hook)
- onBuildEnd (afterEmit hook)
- onBuildExit (done hook)

and more than 100 entry point:
- Compiler Hooks
- Compilation Hooks
- ContextModuleFactory Hooks 
- JavascriptParser Hooks
- NormalModuleFactory Hooks

in webpack or webpack-dev-server 

such as 
- run process
- wait until
- sleep

#### Usage
You can use in typescript and javascript as well. The example is in typescript

Webpack.config.js:

Simple example: 
```ts

let options: Options = new Options();
options.onBuildStart.addOperations(    
     new RunProcess({        
        commands: [
            {                
                execute: 'echo',
                args: ['Starting'],              
            }
        ]
    })
);   

options.onBuildEnd.addOperations(    
     new RunProcess({        
        commands: [
            {                
                execute: 'python',
                args: ['script.py'],               
            },
            {                
                execute: 'node',
                args: ['script.js'],               
            }
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

...
//somewhere in the webpack config
...
 plugins: [
    ...
    new WebpackHookAttacherPlugin(options);
    ...
]
...

```

Complex example:
```ts

import {
    WebpackHookAttacherPlugin,
    Options    
} from '@wecdev/webpack-hook-attacher';

public static getAppModuleWebpackHookAttacherPlugin(): WebpackHookAttacherPlugin {

  let options: Options = new Options();
  options.silent = false;
  
  
  //attach to afterEmit hook
  options.onBuildExit.addOperations(    
    new RunProcess({
        additionalName: `runProcess`,
        commands: [
            {
                processCreationType: ProcessCreationType.spawn,
                execute: 'npm.cmd',
                args: ['run', 'copy-files'],
                options: {
                    detached: true
                }
            },
            {
                processCreationType: ProcessCreationType.spawn,
                execute: 'npm.cmd',
                args: ['run', 'start-zipping'],
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
