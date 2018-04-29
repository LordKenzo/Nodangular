export const Input = (name?: string) => {
  return (target: any, propertyKey: string | symbol) => {
    target.metaInput = target.metaInput || { inputs: [] }
    target.metaInput.inputs = [
      ...target.metaInput.inputs,
      propertyKey
    ];
    console.log('metaInput', target.metaInput);
  }
}
