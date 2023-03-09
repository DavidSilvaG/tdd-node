export const validationErrors = {
    onlyPositiveIntegerAllowed : (field: string, value: any) => `${field} should be integer greater than zero, received ${value}`,
    keysRequired : (keys: string[]) => `Required values missing: ${keys.join(', ')}`,
    onlyStringAllowed:  'All fields must be string',
    invalidHomeWorld:  'Homeworld provided does not follow the required syntax',
    homeWorldNotFound:  'Homeworld provided does not exist on Swapi',
}