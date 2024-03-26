<h1 align="center">
    <img src="../assets/workflow-arch-logo.png">
</h1>
<p align="center">
🇧🇷 Arquitetura de <i>Workflow</i> para executar seus scripts sequencialmente ou paralelo em NodeJS.</br>
🇺🇸 <i>Workflow Architecture</i> to run your scripts sequentially or parallel in NodeJS.
</p>
<hr>

## Resume

The main goal of this architecture is to facilitate the controlled execution of scripts. It can be used in various types of scenarios and needs, such as in _event-driven applications_, _crawlers_, _scraping_, _crons_, among others. The Workflow Architecture is very well suited to the needs of asynchronous communication applications.

## Features

Below are the features present in the architecture:

- **Workflows**: They are the largest unit of the architecture, containing the logic and control of the execution of the pipelines. Workflows are the entry layer for the execution of other units and are also responsible for sending data to be processed by the steps to the child layers.
- **Pipelines**: Behave similarly to workflows but are responsible for deciding the form and order (if applicable) of the steps. They can be of two types: `Sequential` and `Parallel`.
  - **SequentialPipeline**: These pipelines execute the steps sequentially, i.e., one at a time, and following an order.
  - **ParallelPipeline**: These pipelines execute the steps in parallel, i.e., without a sequence or order. They are indicated when one step does not depend on the execution of another.
- **Steps**: These are the smallest unit of the architecture. They are responsible for interacting with the data sent and performing the necessary actions of the script. They can be compared to UseCases in other architectures.
- **GlobalContext**: It's a mutable global variable that can receive any type of data. Thus, it becomes the application context and can be accessed and modified by the steps according to the need.

<img src="../assets/example.png">

## Inspiration

In general, architectures are not built or created without any motivation. Most of them evolve from existing architectures or are even a complement, such as `MVC (Model View Controller)` and `MVVM (Model View ViewModel)`. The Workflow Architecture, however, is inspired by the operation of Github Actions. Where there are several workflow files, and within those workflows, you have one (or several) pipelines to be executed. And each pipeline has its steps, which are literally stages to be executed for the script's completion. Thus, we have an abstraction of this system in the form of an architecture that can be used in projects not only in NodeJS but in any language.

## Folder Structure

```bash
.
├── index.js # Entry file
└── src
    ├── core # Main layer of the application, where the main classes are found
    │   ├── ParallelPipeline.js
    │   ├── Pipeline.js
    │   ├── SequentialPipeline.js
    │   ├── Step.js
    │   └── Workflow.js
    ├── pipelines
    │   └── # Here contain your pipelines
    ├── steps
    │   └── # Here contain your steps. (You can also divide them by folders)
    │
    └── workflows
        └── # Here contain your workflows
```

## Example

To illustrate the use of the architecture, below we have the implementation of a basic script that runs the pipelines sequentially, and adds a console.log() to each executed step.<br/>

The first step is to create our steps, in this example, they will only receive the application's global context data and show it on the console.<br/><br/>

`src/steps/ExampleStep1.ts`

```javascript
import Step from "core/Step";

export default class ExampleStep1 extends Step {
  async run(context: GlobalContext): Promise<GlobalContext> {
    // Your code here
    console.log("Step1 running");
    return context;
  }
}
```

`src/steps/ExampleStep2.ts`

```javascript
import Step from "core/Step";

export default class ExampleStep2 extends Step {
  async run(context: GlobalContext): Promise<GlobalContext> {
    // Your code here
    console.log("Step2 running");
    return context;
  }
}
```

The second step is to create our pipeline, in this case, we will use a sequential pipeline as we do not need our steps to be executed in parallel.<br/><br/>

`src/pipelines/ExamplePipeline.ts`

```javascript
import SequentialPipeline from "core/SequentialPipeline";
import ExampleStep1 from "steps/ExampleStep1";
import ExampleStep2 from "steps/ExampleStep2";

export default class ExamplePipeline extends SequentialPipeline {
  constructor() {
    const step1 = new ExampleStep1();
    const step2 = new ExampleStep2();

    super([step1, step2]);
  }
}
```

The last step is to create our Workflow, tell it which pipeline it should execute (remembering that you can execute as many as you want) and execute it.

`src/workflows/ExampleWorkflow.ts`

```javascript
import Workflow from "core/Workflow";
import ExamplePipeline from "pipelines/ExamplePipeline";

export default class ExampleWorkflow extends Workflow {
  constructor() {
    const pipeline1 = new ExamplePipeline();
    super([pipeline1]);
  }

  async run(context: GlobalContext): Promise<GlobalContext> {
    for (const pipeline of this.pipelines) {
      try {
        context = await pipeline.run(context);
      } catch (error) {
        throw error;
      }
    }
    return context;
  }
}
```

`index.ts`

```javascript
import ExampleWorkflow from "workflows/ExampleWorkflow";

// Variable with the global context that will be accessed and modified by the steps
const data: GlobalContext = {
  name: "Workflow Architecture",
};

(async () => {
  const exampleWorkflow = new ExampleWorkflow();
  console.log("result", await exampleWorkflow.run(data));
})();
```

[Implemented example above](https://github.com/gabrielrab/workflow-architecture/tree/example/basic-run)

<hr>
Gabriel Rabelo<br/>
<a href="https://github.com/gabrielrab">@gabrielrab</a>
