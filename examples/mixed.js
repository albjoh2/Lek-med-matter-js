var Example = Example || {};

Example.mixed = function () {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
    },
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  var stack = Composites.stack(20, 20, 10, 1, 20, 0, function (x, y) {
    var sides = Math.round(Common.random(1, 8));

    switch (Math.round(Math.random(0, 1))) {
      case 0:
        return Bodies.rectangle(
          x,
          y,
          Math.random() * (60 - 15) + 15,
          Math.random() * (70 - 15) + 15
        );
      case 1:
        return Bodies.polygon(x, y, sides, Math.random() * (40 - 10) + 10, {});
    }
  });

  Composite.add(world, stack);

  Composite.add(world, [
    // walls
    Bodies.rectangle(400, -25, 825, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 825, 50, { isStatic: true }),
    Bodies.rectangle(825, 300, 50, 625, { isStatic: true }),
    Bodies.rectangle(-25, 300, 50, 625, { isStatic: true }),
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
};

Example.mixed.title = "Simulation";
Example.mixed.for = ">=0.14.2";

if (typeof module !== "undefined") {
  module.exports = Example.mixed;
}
