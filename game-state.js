class GameState {
    constructor(context, gameObjects) {
        this.context = context;
        this.gameObjects = gameObjects;
        this.isRunning = false;
        this.userInteractionState = new UserInteractionState();
    }

    toggleIsRunning(){
        this.isRunning = !this.isRunning;

        this.gameObjects.forEach(gameObject => {
            if (!gameObject.isAlwaysStatic()) {
                Matter.Body.setStatic(gameObject.getMatterShape(), !this.isRunning);
            }
        });
    }

    getIsRunning() {
        return this.isRunning;
    }
  
    draw() {
        gameObjects.forEach(gameObject => {
            gameObject.draw();
        });
    }

    getGameObjects(){
        return this.gameObjects;
    }

    addGameObject(shape, alwaysStatic = false){
        this.gameObjects.push(new GameObject(this.context, shape, alwaysStatic));
    }

    selectShape(shape){
        this.userInteractionState.selectShape(shape);
    }

    tryGetSelectedShape(){
        if(this.isRunning || !this.userInteractionState.hasSelectedShape()){
            return false;
        }

        return this.userInteractionState.popSelectedShape();
    }
  }