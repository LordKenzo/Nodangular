export function Input(target: any,propertyKey: string | symbol) {
  target.metaInput = target.metaInput || { inputs: [] }
    target.metaInput.inputs = [
      ...target.metaInput.inputs,
      propertyKey
    ]
  console.log('metaInput', target.metaInput);
}
