/* https://stackoverflow.com/a/43674389 */
export function staticImplements<T>() {
    return (constructor: T) => {}
}