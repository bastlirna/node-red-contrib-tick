# node-red-contrib-tick

> A Node-RED Tick node, for precise periodic messaging

## Installation

Install `node-red-contrib-tick` using [npm](https://www.npmjs.com/):

```bash
npm install --save node-red-contrib-tick
```

## Usage

To use the node, launch Node-RED (see [running Node-RED](http://nodered.org/docs/getting-started/running.html) for help getting started).

Tick node emits message periodically in given interval. Message is emitted relative to *system time*. When `time mod interval = 0` is satisfy node ticks.
    
This is different from inject node in repeat mode which is relative to deploy (e. g. 1 second from deploy not when system time is exactly whole second).   

Outputs message containing `msg.payload` and `msg.error`.

- msg.payload is counter (increases by 1 every tick)
- msg.error is difference from desired tick time (in ms)

