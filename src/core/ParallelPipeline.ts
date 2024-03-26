import Pipeline from "core/Pipeline";

export default abstract class ParallelPipeline extends Pipeline {
  async run(context: GlobalContext): Promise<GlobalContext> {
    await Promise.all(
      this.steps.map((step) =>
        step.run(context).catch((error) => {
          throw error;
        })
      )
    );
    return context;
  }
}
