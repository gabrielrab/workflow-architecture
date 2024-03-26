// Write your logic and import your workflows and data below
// Example:

import ExampleWorkflow from "workflows/ExampleWorkflow";

const data: GlobalContext = {
  name: "Workflow Architecture",
};

(async () => {
  const exampleWorkflow = new ExampleWorkflow();
  console.log("result", await exampleWorkflow.run(data));
})();
