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
