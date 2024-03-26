import Step from "core/Step";

export default class ExampleStep1 extends Step {
  async run(context: GlobalContext): Promise<GlobalContext> {
    // Your code here
    console.log("Step1 running");
    return context;
  }
}
