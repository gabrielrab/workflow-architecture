import Step from "core/Step";

export default abstract class Pipeline {
  steps: Step[];

  constructor(steps: Step[]) {
    this.steps = steps;
  }

  abstract run(context: GlobalContext): Promise<GlobalContext>;
}
