import Step from "core/Step";

export default class ExampleStep2 extends Step {
  async run(context: GlobalContext): Promise<GlobalContext> {
    // Your code here
    console.log("Step2 running");
    return context;
  }
}
