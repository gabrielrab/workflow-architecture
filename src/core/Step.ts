export default abstract class Step {
  abstract run(context: GlobalContext): Promise<GlobalContext>;
}
