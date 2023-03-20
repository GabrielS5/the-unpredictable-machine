var fps = 1000 / 60;
var handledBody = null;
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;
var gameObjects = [];

var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
var gameState = new GameState(context, gameObjects);


// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    // canvas: document.getElementById('game-canvas')
    element: document.getElementById('matter-render'),
    engine: engine
});

var matterCanvas = document.getElementById("matter-render").firstChild;
matterCanvas.addEventListener('click', onClick, false);
var matterCanvasLeft = matterCanvas.offsetLeft + matterCanvas.clientLeft;
var matterCanvasTop = matterCanvas.offsetTop + matterCanvas.clientTop;

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

gameState.addGameObject(boxA);
gameState.addGameObject(boxB);
gameState.addGameObject(ground, true);

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

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
window.setInterval(() => {
    // handle drag and drop
    if (mouseConstraint.body != null) {
        handledBody = mouseConstraint.body;
        if (handledBody.isStatic) {
            Matter.Body.setStatic(handledBody, false);
        }
    }

    if (mouseConstraint.body == null) {
        if (handledBody != null && !gameState.getIsRunning()) {
            Matter.Body.setStatic(handledBody, true);
        }
        handledBody = null;
    }

    Runner.tick(runner, engine, fps);
    context.clearRect(0, 0, canvas.width, canvas.height);
    gameState.draw();
}, fps)

function onRun() {
    gameState.toggleIsRunning();

    if (gameState.getIsRunning()) {
        mouseConstraint.collisionFilter.mask = 0x0000;
    } else {
        mouseConstraint.collisionFilter.mask = 0x0001;
    }
}

function onSelectShape(shape) {
    gameState.selectShape(shape);
}

function onClick(event) {
    var shape = gameState.tryGetSelectedShape();
    
    if(!shape){
        return;
    }

    var x = event.pageX - matterCanvasLeft;
    var y = event.pageY - matterCanvasTop;

    var shape = Bodies.fromVertices(x, y, ShapeTemplates.getShapeTemplate(shape), {
        isStatic: true,
        collisionFilter: {
            group: 1,
            mask: 0x0001
        }
    });

    Composite.add(engine.world, [shape]);
    gameState.addGameObject(shape);
}