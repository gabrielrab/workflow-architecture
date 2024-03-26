import Pipeline from "core/Pipeline";

export default abstract class SequentialPipeline extends Pipeline {
  async run(context: GlobalContext): Promise<GlobalContext> {
    for (const step of this.steps) {
      try {
        await step.run(context);
      } catch (error) {
        throw error;
      }
    }
    return context;
  }
}
