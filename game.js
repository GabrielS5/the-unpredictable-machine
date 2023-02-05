var fps = 1000 / 60;
var isRunning = false;
var handledBody = null;
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    isStatic: true,
    collisionFilter: {
        group: 1,
        mask: 0x0001
    }
});
var boxB = Bodies.rectangle(450, 50, 80, 80, {
    isStatic: true,
    collisionFilter: {
        group: 1,
        mask: 0x0001
    }
});
var ground = Bodies.rectangle(400, 610, 810, 60, {
    isStatic: true,
    collisionFilter: {
        group: 1,
        mask: 0x0000
    }
});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        },
        collisionFilter: {
            mask: 0x0001
        }
    });

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

function onRun() {
    isRunning = !isRunning;
    Matter.Body.setStatic(boxA, !isRunning);
    Matter.Body.setStatic(boxB, !isRunning);
    if (isRunning) {
        mouseConstraint.collisionFilter.mask = 0x0000;
    } else {
        mouseConstraint.collisionFilter.mask = 0x0001;
    }
    // Matter.Body.applyForce(boxA,boxA.position, {x: 0, y: -0.2});
}

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
window.setInterval(() => {
    if (mouseConstraint.body != null) {
        handledBody = mouseConstraint.body;
        if (handledBody.isStatic) {
            Matter.Body.setStatic(handledBody, false);
        }
    }

    if (mouseConstraint.body == null) {
        if (handledBody != null && !isRunning) {
            Matter.Body.setStatic(handledBody, true);
        }
        handledBody = null;
    }

    Runner.tick(runner, engine, fps);
}, fps)