module.exports = function (RED) {
    "use strict";

    function TickNode(config) {

        RED.nodes.createNode(this, config);

        var node = this;
        var counter = 0;
        var running = true;
        var error, timer, nextTickTime;

        var interval = parseFloat(config.interval) || 1000;

        function setNextTick() {
            var now = (new Date()).getTime();
            var next = interval - (now % interval);

            if (error) { // not first run
                if (next < (interval / 2)) {
                    // premature prepare
                    next += interval;
                }
                next -= error;
            }

            nextTickTime = now + next;
            timer = setTimeout(tick, next);
        }

        function tick() {
            var now = new Date().getTime();

            error = now - nextTickTime;
            counter++;

            node.send({
                payload: counter,
                error: error
            });

            if (running) {
                setNextTick();
            }
        }

        this.on("close", function () {
            running = false;
            if (timer) {
                clearTimeout(timer);
            }
        });

        setNextTick();
    }

    RED.nodes.registerType("tick", TickNode);
};
