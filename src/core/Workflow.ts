import Pipeline from "core/Pipeline";

export default abstract class Workflow {
  pipelines: Pipeline[];

  constructor(pipelines: Pipeline[]) {
    this.pipelines = pipelines;
  }

  abstract run(context: GlobalContext): Promise<GlobalContext>;
}
