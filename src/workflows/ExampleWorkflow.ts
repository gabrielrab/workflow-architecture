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
